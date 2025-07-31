// Clean popup.js - All features unlocked, no premium restrictions

$(document).ready(function() {
    // Initialize variables
    let contacts = [];
    let messagesSent = 0;
    let isProcessing = false;
    let isPaused = false;
    
    // Load saved data
    loadSavedData();
    
    // Initialize tooltips
    $('[data-bs-toggle="tooltip"]').tooltip();
    
    // File upload handling
    $('#uploadArea').on('click', function() {
        $('#fileInput').click();
    });
    
    $('#fileInput').on('change', function(e) {
        handleFileUpload(e.target.files[0]);
    });
    
    // Drag and drop
    $('#uploadArea').on('dragover', function(e) {
        e.preventDefault();
        $(this).addClass('border-primary');
    });
    
    $('#uploadArea').on('dragleave', function(e) {
        e.preventDefault();
        $(this).removeClass('border-primary');
    });
    
    $('#uploadArea').on('drop', function(e) {
        e.preventDefault();
        $(this).removeClass('border-primary');
        const files = e.originalEvent.dataTransfer.files;
        if (files.length > 0) {
            handleFileUpload(files[0]);
        }
    });
    
    // Toggle delay settings
    $('#enableDelay').on('change', function() {
        if ($(this).is(':checked')) {
            $('#delaySettings').slideDown();
        } else {
            $('#delaySettings').slideUp();
        }
    });
    
    // Download template
    $('#downloadTemplate').on('click', function() {
        downloadExcelTemplate();
    });
    
    // Clear contacts
    $('#clearContacts').on('click', function() {
        if (confirm('Are you sure you want to clear all contacts?')) {
            contacts = [];
            updateContactsDisplay();
            showToast('Contacts cleared', 'success');
        }
    });
    
    // Add manual numbers
    $('#addNumbers').on('click', function() {
        const numbers = $('#manualNumbers').val().split(',').map(n => n.trim()).filter(n => n);
        if (numbers.length > 0) {
            numbers.forEach(num => {
                contacts.push({ phoneNumber: num });
            });
            updateContactsDisplay();
            $('#manualNumbers').val('');
            showToast(`Added ${numbers.length} contacts`, 'success');
        }
    });
    
    // Send button
    $('#sendButton').on('click', function() {
        startSending();
    });
    
    // Pause button
    $('#pauseButton').on('click', function() {
        pauseSending();
    });
    
    // Stop button
    $('#stopButton').on('click', function() {
        stopSending();
    });
    
    // Team management
    $('#addTeamMember').on('click', function() {
        const name = $('#teamMemberName').val().trim();
        const phone = $('#teamMemberPhone').val().trim();
        
        if (!name || !phone) {
            showToast('Please enter both name and phone number', 'error');
            return;
        }
        
        addTeamMember(name, phone);
        $('#teamMemberName').val('');
        $('#teamMemberPhone').val('');
    });
    
    // Add team member function
    function addTeamMember(name, phone) {
        chrome.storage.local.get(['teamMembers'], function(result) {
            const teamMembers = result.teamMembers || [];
            teamMembers.push({ name, phone, addedDate: new Date().toLocaleDateString() });
            chrome.storage.local.set({ teamMembers }, function() {
                updateTeamMembersList();
                showToast(`${name} added to team`, 'success');
            });
        });
    }
    
    // Update team members list
    function updateTeamMembersList() {
        chrome.storage.local.get(['teamMembers'], function(result) {
            const teamMembers = result.teamMembers || [];
            const membersList = $('#teamMembersList');
            
            if (teamMembers.length === 0) {
                membersList.html('<p class="text-muted">No team members added yet.</p>');
                return;
            }
            
            let html = '';
            teamMembers.forEach((member, index) => {
                html += `
                    <div class="team-member-item d-flex justify-content-between align-items-center p-3 mb-2 border rounded">
                        <div>
                            <strong>${member.name}</strong>
                            <br><small class="text-muted">${member.phone}</small>
                            <br><small class="text-muted">Added: ${member.addedDate}</small>
                        </div>
                        <button class="btn btn-sm btn-outline-danger" onclick="removeTeamMember(${index})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
            });
            membersList.html(html);
        });
    }
    
    // Remove team member function (global)
    window.removeTeamMember = function(index) {
        chrome.storage.local.get(['teamMembers'], function(result) {
            const teamMembers = result.teamMembers || [];
            const removedMember = teamMembers.splice(index, 1)[0];
            chrome.storage.local.set({ teamMembers }, function() {
                updateTeamMembersList();
                showToast(`${removedMember.name} removed from team`, 'success');
            });
        });
    };
    
    // Handle file upload
    function handleFileUpload(file) {
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const data = e.target.result;
                const workbook = XLSX.read(data, { type: 'binary' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet);
                
                // Process the data
                contacts = jsonData.map(row => {
                    // Look for phone number in various possible column names
                    const phoneNumber = row.phoneNumber || row.phone || row.number || 
                                      row.whatsapp || row.mobile || row.contact || 
                                      Object.values(row)[0]; // fallback to first column
                    
                    return {
                        phoneNumber: String(phoneNumber).replace(/\D/g, ''),
                        ...row
                    };
                });
                
                updateContactsDisplay();
                showToast(`Loaded ${contacts.length} contacts`, 'success');
            } catch (err) {
                showToast('Error reading file. Please check the format.', 'error');
                console.error(err);
            }
        };
        
        reader.readAsBinaryString(file);
    }
    
    // Download Excel template
    function downloadExcelTemplate() {
        const template = [
            {
                phoneNumber: '+919999988888',
                name: 'John Doe',
                customField1: 'Value 1',
                customField2: 'Value 2'
            },
            {
                phoneNumber: '+918888877777',
                name: 'Jane Smith',
                customField1: 'Value 3',
                customField2: 'Value 4'
            }
        ];
        
        const ws = XLSX.utils.json_to_sheet(template);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Contacts');
        XLSX.writeFile(wb, 'whatsapp_template.xlsx');
    }
    
    // Start sending messages
    function startSending() {
        const message = $('#messageText').val().trim();
        
        if (!message) {
            showToast('Please enter a message', 'error');
            return;
        }
        
        if (contacts.length === 0) {
            showToast('Please add contacts first', 'error');
            return;
        }
        
        // Update UI
        isProcessing = true;
        isPaused = false;
        $('#sendButton').hide();
        $('#pauseButton').show();
        $('#stopButton').show();
        $('#progressSection').show();
        
        // Prepare sending parameters
        const params = {
            command: 'start messaging background',
            context: {
                arr: contacts.map(c => c.phoneNumber),
                message: message,
                is_custom_message: $('#personalizedMsg').is(':checked'),
                is_image: $('#sendAttachments').is(':checked'),
                is_time_stamp: $('#addTimestamp').is(':checked'),
                timeDelayFrom: $('#enableDelay').is(':checked') ? $('#delayFrom').val() : 1,
                timeDelayTo: $('#enableDelay').is(':checked') ? $('#delayTo').val() : 1,
                execl_coloumn: contacts
            }
        };
        
        // Send to background script
        chrome.runtime.sendMessage(params);
        
        // Start progress tracking
        trackProgress();
    }
    
    // Pause sending
    function pauseSending() {
        isPaused = true;
        $('#pauseButton').text('Resume').removeClass('btn-warning').addClass('btn-success');
        
        chrome.runtime.sendMessage({
            context: {
                process_state: 'PAUSE'
            }
        });
    }
    
    // Stop sending
    function stopSending() {
        isProcessing = false;
        isPaused = false;
        
        chrome.runtime.sendMessage({
            context: {
                process_state: 'STOP'
            }
        });
        
        // Reset UI
        $('#sendButton').show();
        $('#pauseButton').hide();
        $('#stopButton').hide();
        showToast('Sending stopped', 'info');
    }
    
    // Track sending progress
    function trackProgress() {
        chrome.storage.local.get(['currentState'], function(result) {
            if (result.currentState) {
                const state = result.currentState;
                const sent = state.msgSent || 0;
                const total = state.msgTotal || contacts.length;
                const progress = total > 0 ? (sent / total) * 100 : 0;
                
                $('#progressBar').css('width', progress + '%');
                $('#progressText').text(`${sent}/${total}`);
                
                // Update stats
                $('#messagesToday').text(sent);
                
                if (state.state === 'STOP' || sent >= total) {
                    // Sending complete
                    isProcessing = false;
                    $('#sendButton').show();
                    $('#pauseButton').hide();
                    $('#stopButton').hide();
                    
                    if (sent >= total) {
                        showToast(`Successfully sent ${sent} messages!`, 'success');
                        // Generate report
                        generateReport();
                    }
                } else if (isProcessing) {
                    // Continue tracking
                    setTimeout(trackProgress, 1000);
                }
            }
        });
    }
    
    // Generate report
    function generateReport() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                context: {
                    export_results: 'true'
                }
            });
        });
    }
    
    // Load saved data
    function loadSavedData() {
        chrome.storage.local.get(['messagesSent', 'totalMessages', 'savedMessage'], function(result) {
            if (result.messagesSent) {
                $('#messagesToday').text(result.messagesSent);
            }
            if (result.totalMessages) {
                $('#messagesTotal').text(result.totalMessages);
            }
            if (result.savedMessage) {
                $('#messageText').val(result.savedMessage);
            }
        });
    }
    
    // Save message on change
    $('#messageText').on('input', function() {
        const message = $(this).val();
        chrome.storage.local.set({ savedMessage: message });
    });
    
    // Privacy settings
    $('#blurMessages, #blurContacts, #blurPhotos').on('change', function() {
        const settings = {
            blurMessages: $('#blurMessages').is(':checked'),
            blurContacts: $('#blurContacts').is(':checked'),
            blurPhotos: $('#blurPhotos').is(':checked')
        };
        
        chrome.storage.local.set({ privacySettings: settings });
        applyPrivacySettings(settings);
    });
    
    // Apply privacy settings
    function applyPrivacySettings(settings) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: 'updatePrivacy',
                settings: settings
            });
        });
    }
    
    // Update contacts display function
    function updateContactsDisplay() {
        // Find or create contacts list element
        let contactsList = $('#contactsList');
        if (contactsList.length === 0) {
            // Create contacts list if it doesn't exist
            contactsList = $('<div id="contactsList" class="mt-3"></div>');
            $('#contacts .feature-card').last().after(contactsList);
        }
        
        contactsList.empty();
        if (contacts.length > 0) {
            contacts.forEach((contact, index) => {
                const contactHtml = `
                    <div class="contact-item d-flex justify-content-between align-items-center p-2 border-bottom">
                        <div>
                            <strong>${contact.name || 'N/A'}</strong>
                            <br><small class="text-muted">${contact.phoneNumber}</small>
                        </div>
                        <button class="btn btn-sm btn-outline-danger" onclick="removeContact(${index})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
                contactsList.append(contactHtml);
            });
        } else {
            contactsList.append('<p class="text-muted text-center p-3">No contacts loaded</p>');
        }
        
        // Update contact count in stats if element exists
        if ($('#contactCount').length > 0) {
            $('#contactCount').text(contacts.length);
        }
    }
    
    // Remove contact function (global)
    window.removeContact = function(index) {
        contacts.splice(index, 1);
        updateContactsDisplay();
        showToast('Contact removed', 'success');
    };
    
    // Toast notification
    function showToast(message, type = 'info') {
        const toastHtml = `
            <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
                <div class="toast align-items-center text-white bg-${type === 'success' ? 'success' : type === 'error' ? 'danger' : 'primary'} border-0" role="alert">
                    <div class="d-flex">
                        <div class="toast-body">
                            ${message}
                        </div>
                        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
                    </div>
                </div>
            </div>
        `;
        
        const toastElement = $(toastHtml);
        $('body').append(toastElement);
        
        const toast = new bootstrap.Toast(toastElement.find('.toast')[0]);
        toast.show();
        
        toastElement.on('hidden.bs.toast', function() {
            toastElement.remove();
        });
    }
    
    // Check WhatsApp connection
    function checkWhatsAppConnection() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            if (tabs[0].url.includes('web.whatsapp.com')) {
                $('#loadingOverlay').hide();
                $('#mainApp').show();
            } else {
                showToast('Please open WhatsApp Web first', 'error');
                setTimeout(() => {
                    chrome.tabs.create({ url: 'https://web.whatsapp.com' });
                }, 2000);
            }
        });
    }
    
    // Initialize on load
    checkWhatsAppConnection();
    updateTeamMembersList();
    
    // Listen for messages from content script
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.subject === 'progress-bar-sent') {
            // Update progress from content script
            const progress = (request.sent / request.total) * 100;
            $('#progressBar').css('width', progress + '%');
            $('#progressText').text(`${request.sent}/${request.total}`);
            $('#messagesToday').text(request.sent);
        }
    });
    
    // Export/Import settings
    $('#exportSettings').on('click', function() {
        chrome.storage.local.get(null, function(data) {
            const dataStr = JSON.stringify(data, null, 2);
            const blob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'whatsapp_sender_settings.json';
            a.click();
            URL.revokeObjectURL(url);
        });
    });
    
    // Keyboard shortcuts
    $(document).on('keydown', function(e) {
        // Ctrl/Cmd + Enter to send
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            if (!isProcessing && $('#sendButton').is(':visible')) {
                startSending();
            }
        }
        // Escape to stop
        if (e.key === 'Escape' && isProcessing) {
            stopSending();
        }
    });
    
    // Auto-save contacts periodically
    setInterval(function() {
        if (contacts.length > 0) {
            chrome.storage.local.set({ savedContacts: contacts });
        }
    }, 30000); // Every 30 seconds
    
    // Load saved contacts on startup
    chrome.storage.local.get(['savedContacts'], function(result) {
        if (result.savedContacts && result.savedContacts.length > 0) {
            contacts = result.savedContacts;
            updateContactsDisplay();
        }
    });
    
    // Update stats periodically
    setInterval(function() {
        chrome.storage.local.get(['messagesSent', 'totalMessages'], function(result) {
            if (result.totalMessages) {
                $('#messagesTotal').text(result.totalMessages);
            }
        });
    }, 5000);
});
