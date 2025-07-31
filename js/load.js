// load.js - Loads additional UI enhancements

(function() {
    'use strict';
    
    // Add custom UI elements to WhatsApp Web
    function enhanceWhatsAppUI() {
        // Add bulk sender button to header
        addBulkSenderButton();
        
        // Add status indicator
        addStatusIndicator();
        
        // Apply saved privacy settings
        applySavedPrivacySettings();
    }
    
    // Add bulk sender button
    function addBulkSenderButton() {
        const header = document.querySelector('header');
        if (header && !document.getElementById('wa-bulk-button')) {
            const button = document.createElement('div');
            button.id = 'wa-bulk-button';
            button.className = 'wa-bulk-button';
            button.innerHTML = `
                <svg viewBox="0 0 24 24" width="24" height="24">
                    <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span>Bulk Sender</span>
            `;
            button.style.cssText = `
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 8px 16px;
                margin: 0 12px;
                background: #25D366;
                color: white;
                border-radius: 20px;
                cursor: pointer;
                font-size: 14px;
                font-weight: 500;
                transition: all 0.3s ease;
            `;
            
            button.addEventListener('click', () => {
                chrome.runtime.sendMessage({ action: 'openPopup' });
            });
            
            button.addEventListener('mouseenter', () => {
                button.style.background = '#128C7E';
                button.style.transform = 'scale(1.05)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.background = '#25D366';
                button.style.transform = 'scale(1)';
            });
            
            header.appendChild(button);
        }
    }
    
    // Add status indicator
    function addStatusIndicator() {
        if (!document.getElementById('wa-status-indicator')) {
            const indicator = document.createElement('div');
            indicator.id = 'wa-status-indicator';
            indicator.className = 'wa-status-indicator';
            indicator.style.cssText = `
                position: fixed;
                bottom: 20px;
                left: 20px;
                background: white;
                padding: 12px 20px;
                border-radius: 24px;
                box-shadow: 0 2px 12px rgba(0,0,0,0.1);
                display: none;
                align-items: center;
                gap: 10px;
                z-index: 1000;
                font-size: 14px;
            `;
            
            document.body.appendChild(indicator);
        }
    }
    
    // Update status indicator
    function updateStatus(status, message) {
        const indicator = document.getElementById('wa-status-indicator');
        if (indicator) {
            let icon = '';
            let color = '';
            
            switch (status) {
                case 'sending':
                    icon = '📤';
                    color = '#25D366';
                    break;
                case 'paused':
                    icon = '⏸️';
                    color = '#FFC107';
                    break;
                case 'stopped':
                    icon = '⏹️';
                    color = '#DC3545';
                    break;
                case 'complete':
                    icon = '✅';
                    color = '#28A745';
                    break;
            }
            
            indicator.innerHTML = `
                <span style="font-size: 20px;">${icon}</span>
                <span style="color: ${color}; font-weight: 500;">${message}</span>
            `;
            indicator.style.display = 'flex';
            
            if (status === 'complete') {
                setTimeout(() => {
                    indicator.style.display = 'none';
                }, 5000);
            }
        }
    }
    
    // Apply saved privacy settings
    function applySavedPrivacySettings() {
        chrome.storage.local.get(['privacySettings'], (result) => {
            if (result.privacySettings) {
                document.body.classList.toggle('privacy-blur-enabled', 
                    result.privacySettings.blurMessages || 
                    result.privacySettings.blurContacts || 
                    result.privacySettings.blurPhotos
                );
            }
        });
    }
    
    // Listen for status updates
    chrome.storage.onChanged.addListener((changes, namespace) => {
        if (changes.currentState) {
            const state = changes.currentState.newValue;
            if (state) {
                switch (state.state) {
                    case 'SEND':
                        updateStatus('sending', `Sending: ${state.msgSent || 0}/${state.msgTotal || 0}`);
                        break;
                    case 'PAUSE':
                        updateStatus('paused', 'Sending paused');
                        break;
                    case 'STOP':
                        if (state.msgSent > 0) {
                            updateStatus('complete', `Sent ${state.msgSent} messages`);
                        } else {
                            updateStatus('stopped', 'Sending stopped');
                        }
                        break;
                }
            }
        }
    });
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Alt + B to open bulk sender
        if (e.altKey && e.key === 'b') {
            e.preventDefault();
            chrome.runtime.sendMessage({ action: 'openPopup' });
        }
        
        // Alt + S to stop sending
        if (e.altKey && e.key === 's') {
            e.preventDefault();
            chrome.runtime.sendMessage({ 
                context: { process_state: 'STOP' }
            });
        }
    });
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', enhanceWhatsAppUI);
    } else {
        enhanceWhatsAppUI();
    }
    
    // Re-initialize on navigation (SPA)
    const observer = new MutationObserver(() => {
        enhanceWhatsAppUI();
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    // Expose functions to global scope
    window.WABulkSender = {
        updateStatus: updateStatus,
        showNotification: (message, type = 'info') => {
            const toast = document.createElement('div');
            toast.className = `wa-toast ${type}`;
            toast.innerHTML = `
                <span>${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
                <span>${message}</span>
            `;
            document.body.appendChild(toast);
            
            setTimeout(() => {
                toast.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => toast.remove(), 300);
            }, 3000);
        }
    };
    
})();