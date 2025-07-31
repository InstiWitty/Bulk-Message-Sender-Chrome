// webResource.js - Direct WhatsApp Web Integration

(function() {
    'use strict';
    
    // Wait for WhatsApp to load
    const waitForWhatsApp = setInterval(() => {
        if (window.Store && window.Store.Chat) {
            clearInterval(waitForWhatsApp);
            initializeIntegration();
        }
    }, 1000);
    
    function initializeIntegration() {
        console.log('WhatsApp Bulk Sender: Integration initialized');
        
        // Listen for messages from content script
        window.addEventListener('message', async (event) => {
            if (event.data.type !== 'FROM_CONTENT_SCRIPT') return;
            
            const { request, number, attachment } = event.data.message;
            
            switch (request) {
                case 'sendAttachment':
                    await handleSendAttachment(attachment, number);
                    break;
                    
                case 'filterNumber':
                    await handleFilterNumber(number);
                    break;
                    
                case 'getContacts':
                    await handleGetContacts();
                    break;
                    
                default:
                    console.log('Unknown request:', request);
            }
        });
        
        // Expose useful functions
        window.WAMessager = {
            getChats: getChats,
            getContacts: getContacts,
            getGroups: getGroups,
            sendMessage: sendMessage,
            checkNumberExists: checkNumberExists
        };
    }
    
    // Get all chats
    function getChats() {
        try {
            return window.Store.Chat.getModelsArray().map(chat => ({
                id: chat.id._serialized,
                name: chat.name,
                isGroup: chat.isGroup,
                unreadCount: chat.unreadCount,
                lastMessage: chat.lastMessage
            }));
        } catch (error) {
            console.error('Error getting chats:', error);
            return [];
        }
    }
    
    // Get all contacts
    function getContacts() {
        try {
            return window.Store.Contact.getModelsArray()
                .filter(contact => contact.isMyContact)
                .map(contact => ({
                    id: contact.id._serialized,
                    name: contact.name || contact.pushname,
                    number: contact.id.user,
                    isMyContact: contact.isMyContact,
                    profilePic: contact.profilePicThumb
                }));
        } catch (error) {
            console.error('Error getting contacts:', error);
            return [];
        }
    }
    
    // Get all groups
    function getGroups() {
        try {
            return window.Store.Chat.getModelsArray()
                .filter(chat => chat.isGroup)
                .map(group => ({
                    id: group.id._serialized,
                    name: group.name,
                    participants: group.groupMetadata.participants.length,
                    description: group.groupMetadata.desc
                }));
        } catch (error) {
            console.error('Error getting groups:', error);
            return [];
        }
    }
    
    // Send message directly
    async function sendMessage(chatId, message) {
        try {
            const chat = window.Store.Chat.get(chatId);
            if (chat) {
                await chat.sendMessage(message);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error sending message:', error);
            return false;
        }
    }
    
    // Check if number exists on WhatsApp
    async function checkNumberExists(number) {
        try {
            const numberId = number + '@c.us';
            const contact = await window.Store.WapQuery.queryExist(numberId);
            return contact.status === 200;
        } catch (error) {
            console.error('Error checking number:', error);
            return false;
        }
    }
    
    // Handle send attachment
    async function handleSendAttachment(attachment, number) {
        try {
            const chatId = number + '@c.us';
            const chat = window.Store.Chat.get(chatId);
            
            if (chat && attachment) {
                // Convert base64 to blob
                const blob = base64ToBlob(attachment.fileData, attachment.mimeType);
                const file = new File([blob], attachment.fileName, { type: attachment.mimeType });
                
                // Send file with caption
                await chat.sendMessage(attachment.fileCaption || '', {
                    media: file
                });
                
                window.dispatchEvent(new CustomEvent('wam:attachments-sent', {
                    detail: { success: true }
                }));
            }
        } catch (error) {
            console.error('Error sending attachment:', error);
            window.dispatchEvent(new CustomEvent('wam:attachments-sent', {
                detail: { success: false, error: error.message }
            }));
        }
    }
    
    // Handle filter number
    async function handleFilterNumber(number) {
        try {
            const exists = await checkNumberExists(number);
            window.dispatchEvent(new CustomEvent('WAM::filtered', {
                detail: { status: exists ? 'Valid' : 'Invalid' }
            }));
        } catch (error) {
            window.dispatchEvent(new CustomEvent('WAM::filtered', {
                detail: { status: 'Error' }
            }));
        }
    }
    
    // Handle get contacts
    async function handleGetContacts() {
        try {
            const contacts = getContacts();
            const groups = getGroups();
            
            window.dispatchEvent(new CustomEvent('wam:get-contacts-ready', {
                detail: {
                    contacts: contacts,
                    groups: groups,
                    chats: getChats()
                }
            }));
        } catch (error) {
            console.error('Error getting contacts:', error);
            window.dispatchEvent(new CustomEvent('wam:get-contacts-ready', {
                detail: { error: error.message }
            }));
        }
    }
    
    // Utility function to convert base64 to blob
    function base64ToBlob(base64, mimeType) {
        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);
        
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: mimeType });
    }
    
    // Notify content script that we're ready
    window.dispatchEvent(new CustomEvent('WAM::ready'));
    
})();