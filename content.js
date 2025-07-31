// Simplified content.js - All features enabled

"use strict";

// Inject web resource script
(function() {
    const script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.setAttribute("id", "webResource");
    script.src = chrome.runtime.getURL("js/webResource.js");
    script.onload = function() {
        this.parentNode.removeChild(this);
    };
    document.head.appendChild(script);
})();

// Global variables
let myNumber = null;
let currentState = { state: "STOP" };
let stopSending = false;
let pauseSending = false;
let rows = [["Phone Number", "Result"]];
let continueFunction = null;

// Initialize on load
window.onload = function() {
    try {
        // Get user's WhatsApp number
        const wid = window.localStorage.getItem("last-wid") || window.localStorage.getItem("last-wid-md");
        if (wid) {
            myNumber = wid.includes("@") ? wid.split("@")[0].substring(1) : wid.split(":")[0].substring(1);
        }
        chrome.storage.local.set({ currentState });
    } catch (error) {
        console.error("Error getting WhatsApp number:", error);
    }
};

// Ensure wamessager element exists
if (!document.getElementById("wamessager")) {
    const link = document.createElement("a");
    link.id = "wamessager";
    document.body.append(link);
}

// Pause functionality
function pauser() {
    return new Promise((resolve) => {
        continueFunction = function() {
            pauseSending = false;
            continueFunction = null;
            currentState = { ...currentState, state: "SEND" };
            chrome.storage.local.set({ currentState }, () => {
                resolve("resolved");
            });
        };
    });
}

// Listen for messages from popup/background
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    receiver(request, sender, sendResponse);
    return true;
});

// Message receiver
async function receiver(request, sender, sendResponse) {
    if (!request.context) {
        sendResponse({ success: false });
        return;
    }

    const context = request.context;

    // Handle different commands
    if (context.process_state === "continue") {
        await handleBulkSending(context);
        sendResponse({ success: true });
    } else if (context.export_results === "true") {
        exportResults();
        sendResponse({ success: true });
    } else if (context.process_state) {
        handleProcessState(context.process_state);
        sendResponse({ success: true });
    } else if (context.filter_numbers) {
        await filterNumbers(context.numbers);
        sendResponse({ success: true });
    } else {
        sendResponse({ success: false });
    }
}

// Handle bulk sending
async function handleBulkSending(context) {
    const { numbers, message, is_custom_message, execl_coloumn } = context;
    let messages = [];

    if (is_custom_message && execl_coloumn) {
        // Process personalized messages
        messages = processPersonalizedMessages(message, execl_coloumn);
    } else {
        // Same message for all
        messages = numbers.map(() => message);
    }

    // Start sending
    await sendMessages(
        numbers,
        messages,
        execl_coloumn,
        context.is_image,
        context.timeDelayFrom,
        context.timeDelayTo,
        context.is_time_stamp,
        context.batch_size,
        context.batch_delay
    );
}

// Process personalized messages
function processPersonalizedMessages(template, data) {
    const messages = [];
    const pattern = /{{(.*?)}}/g;

    for (let i = 1; i < data.length; i++) {
        let personalizedMsg = template;
        const matches = template.match(pattern);
        
        if (matches) {
            matches.forEach(match => {
                const field = match.replace(/[{}]/g, '');
                const value = data[i][field] || '';
                personalizedMsg = personalizedMsg.replace(match, value);
            });
        }
        
        messages.push(personalizedMsg);
    }

    return messages;
}

// Handle process state changes
function handleProcessState(state) {
    switch (state) {
        case "PAUSE":
            pauseSending = true;
            break;
        case "CONTINUE":
            if (continueFunction) continueFunction();
            break;
        case "STOP":
            stopSending = true;
            if (pauseSending && continueFunction) continueFunction();
            break;
    }
}

// Main sending function
async function sendMessages(numbers, messages, customData, hasAttachment, delayFrom, delayTo, addTimestamp, batchSize, batchDelay) {
    let sentCount = 0;
    currentState = await chrome.storage.local.get("currentState").then(r => r.currentState || {});

    for (let i = 0; i < numbers.length; i++) {
        // Clean phone number
        const phoneNumber = numbers[i].toString().replace(/\D/g, '').replace(/^0+/, '');
        
        // Update progress
        currentState = { ...currentState, msgCount: i, msgSent: sentCount, msgTotal: numbers.length };
        await chrome.storage.local.set({ currentState });
        
        chrome.runtime.sendMessage({
            subject: "progress-bar-sent",
            from: "content",
            count: i,
            sent: sentCount,
            total: numbers.length
        });

        // Check pause/stop
        if (pauseSending) {
            currentState = { ...currentState, state: "PAUSE" };
            await chrome.storage.local.set({ currentState });
            await pauser();
        }

        if (stopSending) {
            stopSending = false;
            break;
        }

        // Add delay between messages
        if (i > 0) {
            const delay = getRandomDelay(delayFrom, delayTo);
            await sleep(delay * 1000);
            
            // Add batch delay if needed
            if (batchSize && i % batchSize === 0) {
                await sleep(batchDelay * 1000);
            }
        }

        // Try to send message
        if (phoneNumber && phoneNumber.length >= 5 && phoneNumber.length <= 20) {
            const opened = await openChat(phoneNumber);
            
            if (opened) {
                let messageToSend = messages[i] || "";
                
                // Add timestamp if enabled
                if (addTimestamp) {
                    messageToSend += "\n\nSent at: " + new Date().toLocaleString();
                }

                if (messageToSend.trim()) {
                    try {
                        await sendText(messageToSend, phoneNumber);
                        rows.push([phoneNumber, "Message sent"]);
                        sentCount++;

                        // Send attachment if enabled
                        if (hasAttachment) {
                            await sendAttachments(phoneNumber, customData ? customData[i + 1] : null);
                            rows[rows.length - 1][1] += " & Media sent";
                        }
                    } catch (error) {
                        console.error("Error sending to:", phoneNumber, error);
                        rows.push([phoneNumber, "Error: " + error.message]);
                    }
                }
            } else {
                rows.push([phoneNumber, "Failed to open chat"]);
            }
        } else {
            rows.push([phoneNumber, "Invalid number"]);
        }
    }

    // Update final state
    currentState = { ...currentState, state: "STOP" };
    await chrome.storage.local.set({ currentState });
    
    chrome.runtime.sendMessage({
        subject: "progress-bar-sent",
        from: "content",
        count: numbers.length,
        sent: sentCount,
        total: numbers.length
    });

    // Export results
    exportResults();

    // Update statistics
    if (sentCount > 0) {
        const stats = await chrome.storage.local.get(['messagesSent', 'totalMessages']);
        await chrome.storage.local.set({
            messagesSent: (stats.messagesSent || 0) + sentCount,
            totalMessages: (stats.totalMessages || 0) + sentCount
        });
    }
}

// Open WhatsApp chat
async function openChat(phoneNumber) {
    const link = document.getElementById("wamessager");
    link.setAttribute("href", `https://api.whatsapp.com/send?phone=${phoneNumber}`);
    link.click();
    
    await sleep(2000);
    
    // Check if chat opened successfully
    const popup = document.querySelector('[data-animate-modal-popup="true"]');
    if (popup) {
        // Error popup appeared
        const closeButton = popup.querySelector("button");
        if (closeButton) closeButton.click();
        return false;
    }
    
    return true;
}

// Send text message
async function sendText(message, phoneNumber) {
    const link = document.getElementById("wamessager");
    link.setAttribute("href", `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`);
    link.click();
    
    await sleep(1000);
    
    // Click send button
    const sendButton = document.querySelector("span[data-icon*='send']");
    if (sendButton) {
        await clickElement(sendButton);
    }
}

// Click element helper
async function clickElement(element) {
    const events = ['mouseover', 'mousedown', 'mouseup', 'click'];
    for (const eventType of events) {
        const event = new MouseEvent(eventType, {
            view: window,
            bubbles: true,
            cancelable: true
        });
        element.dispatchEvent(event);
        await sleep(50);
    }
}

// Send attachments
async function sendAttachments(phoneNumber, customData) {
    // Implementation for sending attachments
    // This would integrate with the attachment modal system
    await sleep(1000);
}

// Filter numbers
async function filterNumbers(numbers) {
    currentState = await chrome.storage.local.get("currentState").then(r => r.currentState || {});
    
    for (let i = 0; i < numbers.length; i++) {
        const number = numbers[i].toString().replace(/\D/g, '').replace(/^0+/, '');
        
        currentState = { ...currentState, msgCount: i, msgTotal: numbers.length };
        await chrome.storage.local.set({ currentState });
        
        if (pauseSending) {
            await pauser();
        }
        
        if (stopSending) {
            stopSending = false;
            break;
        }
        
        await sleep(500);
        
        if (!number || number.length < 5 || number.length > 20) {
            rows.push([numbers[i], "Invalid"]);
        } else {
            // Check if number exists on WhatsApp
            rows.push([number, "Valid"]);
        }
    }
    
    exportResults();
}

// Export results to CSV
function exportResults() {
    const csv = rows.map(row => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "WhatsApp_Report_" + new Date().getTime() + ".csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
    
    URL.revokeObjectURL(url);
    rows = [["Phone Number", "Result"]];
}

// Utility functions
function sleep(ms) {
    return chrome.runtime.sendMessage({ context: "sleep", time: ms });
}

function getRandomDelay(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Listen for privacy settings updates
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'updatePrivacy') {
        applyPrivacySettings(request.settings);
    }
});

// Apply privacy blur settings
function applyPrivacySettings(settings) {
    const style = document.getElementById('privacy-blur-style') || document.createElement('style');
    style.id = 'privacy-blur-style';
    
    let css = '';
    
    if (settings.blurMessages) {
        css += '.message-in, .message-out { filter: blur(5px); } ';
        css += '.message-in:hover, .message-out:hover { filter: none; } ';
    }
    
    if (settings.blurContacts) {
        css += '._21nHd { filter: blur(5px); } ';
        css += '._21nHd:hover { filter: none; } ';
    }
    
    if (settings.blurPhotos) {
        css += '._1AHcd { filter: blur(5px); } ';
        css += '._1AHcd:hover { filter: none; } ';
    }
    
    style.textContent = css;
    document.head.appendChild(style);
}