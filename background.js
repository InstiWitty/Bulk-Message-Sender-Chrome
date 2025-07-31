// Simplified background.js - All features unlocked

// Listen for messages from popup and content scripts
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    handleRequest(request, sender, sendResponse);
    return true; // Indicates async response
});

// Handle requests
async function handleRequest(request, sender, sendResponse) {
    try {
        if (request.context) {
            switch (request.context.command) {
                case 'start messaging background':
                    await startMessaging(request);
                    break;
                    
                case 'sleep':
                    await sleep(request.time);
                    sendResponse({ success: true });
                    break;
                    
                default:
                    // Forward to content script
                    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
                    if (tabs[0]) {
                        chrome.tabs.sendMessage(tabs[0].id, request);
                    }
            }
        }
        
        sendResponse({ success: true });
    } catch (error) {
        console.error('Background error:', error);
        sendResponse({ success: false, error: error.message });
    }
}

// Start messaging process
async function startMessaging(request) {
    const context = {
        numbers: request.context.arr || request.context.numbers,
        message: request.context.message,
        is_image: request.context.is_image,
        process_state: 'continue',
        timeDelayFrom: parseInt(request.context.timeDelayFrom || 1),
        timeDelayTo: parseInt(request.context.timeDelayTo || 1),
        is_time_stamp: request.context.is_time_stamp,
        is_custom_message: request.context.is_custom_message,
        execl_coloumn: request.context.execl_coloumn,
        batch_size: request.context.batch_size || 10,
        batch_delay: request.context.batch_delay || 60
    };
    
    // Send to WhatsApp tab
    const tabs = await chrome.tabs.query({ url: "https://web.whatsapp.com/*" });
    if (tabs.length > 0) {
        chrome.tabs.sendMessage(tabs[0].id, { context: context });
    } else {
        // Open WhatsApp if not already open
        chrome.tabs.create({ url: "https://web.whatsapp.com" }, function(tab) {
            // Wait for tab to load then send message
            chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
                if (tabId === tab.id && info.status === 'complete') {
                    chrome.tabs.onUpdated.removeListener(listener);
                    setTimeout(() => {
                        chrome.tabs.sendMessage(tabId, { context: context });
                    }, 3000);
                }
            });
        });
    }
}

// Sleep function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Initialize storage with default values
chrome.runtime.onInstalled.addListener(function(details) {
    if (details.reason === 'install') {
        // Set default values
        chrome.storage.local.set({
            messagesSent: 0,
            totalMessages: 0,
            currentState: { state: 'STOP' },
            settings: {
                defaultDelay: 5,
                batchSize: 10,
                enableNotifications: true
            }
        });
        
        // Open welcome page
        chrome.tabs.create({
            url: 'popup.html'
        });
    }
});

// Handle extension icon click
chrome.action.onClicked.addListener(function(tab) {
    // Check if WhatsApp Web is open
    if (tab.url.includes('web.whatsapp.com')) {
        // WhatsApp is open, show popup
        chrome.action.setPopup({ popup: "popup.html" });
    } else {
        // Open WhatsApp Web
        chrome.tabs.create({ url: "https://web.whatsapp.com" });
    }
});

// Keep service worker alive
const keepAlive = () => setInterval(chrome.runtime.getPlatformInfo, 20e3);
chrome.runtime.onStartup.addListener(keepAlive);
keepAlive();

// Message passing between popup and content script
chrome.runtime.onConnect.addListener(function(port) {
    port.onMessage.addListener(function(msg) {
        if (msg.action === "keepAlive") {
            port.postMessage({ status: "alive" });
        }
    });
});

// Update stats periodically
setInterval(async () => {
    const result = await chrome.storage.local.get(['currentState']);
    if (result.currentState && result.currentState.msgSent) {
        const total = await chrome.storage.local.get(['totalMessages']);
        const newTotal = (total.totalMessages || 0) + result.currentState.msgSent;
        chrome.storage.local.set({ totalMessages: newTotal });
    }
}, 60000); // Every minute