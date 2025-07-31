# WhatsApp Bulk Sender - Installation & Usage Guide

## 📦 Installation Steps

### 1. Prepare the Extension Files

Create a new folder called `whatsapp-bulk-sender` and add these files:

```
whatsapp-bulk-sender/
├── manifest.json
├── popup.html
├── background.js
├── content.js
├── js/
│   ├── popup.js
│   ├── load.js
│   ├── webResource.js
│   ├── jquery.js (download from jQuery CDN)
│   ├── xlsx.full.min.js (download from SheetJS CDN)
│   └── libphonenumber.max.js (download from Google's libphonenumber)
├── css/
│   └── content.css
└── assets/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

### 2. Add Icons

Create simple WhatsApp-style icons or use these Unicode characters as placeholders:
- Save as PNG files with transparent background
- Use green color (#25D366) for the icon
- You can use online tools like favicon.io to generate icons

### 3. Download Required Libraries

Download these files and place them in the `js/` folder:
- **jQuery**: https://code.jquery.com/jquery-3.7.1.min.js
- **SheetJS**: https://cdn.sheetjs.com/xlsx-0.20.1/package/dist/xlsx.full.min.js
- **libphonenumber**: https://raw.githubusercontent.com/google/libphonenumber/master/javascript/i18n/phonenumbers/phonenumberutil.js

### 4. Load Extension in Chrome

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked"
4. Select your `whatsapp-bulk-sender` folder
5. The extension should now appear in your extensions list

## 🚀 Usage Guide

### Getting Started

1. **Open WhatsApp Web**: Go to https://web.whatsapp.com and scan the QR code
2. **Click the Extension**: Click the extension icon in Chrome toolbar
3. **Grant Permissions**: Allow the extension to access WhatsApp Web

### Sending Bulk Messages

#### Method 1: Excel/CSV Upload

1. Click "Download Template" to get the Excel format
2. Fill in your contacts:
   ```
   phoneNumber    | name      | customField1 | customField2
   +919876543210  | John Doe  | Value1      | Value2
   +918765432109  | Jane Smith| Value3      | Value4
   ```
3. Click or drag your file to the upload area
4. Compose your message using variables:
   - `{{name}}` - Contact's name
   - `{{phoneNumber}}` - Phone number
   - `{{customField1}}`, `{{customField2}}` - Custom fields

#### Method 2: Manual Entry

1. Go to "Contacts" tab
2. Enter numbers separated by commas
3. Click "Add Numbers"

### Message Options

- **Add Timestamp**: Adds date/time to each message
- **Personalized Fields**: Use {{variables}} from your Excel
- **Include Attachments**: Send images/documents with messages
- **Message Delay**: Set random delay between messages (recommended 5-10 seconds)

### Best Practices

1. **Start Small**: Test with 5-10 numbers first
2. **Use Delays**: Always enable delays to avoid being flagged
3. **Personalize**: Use contact names and custom fields
4. **Avoid Spam**: Only message people who have opted in
5. **Monitor Progress**: Watch the progress bar and pause if needed

### Privacy Features

In the Settings tab, you can enable:
- **Blur Messages**: Hides message content until hover
- **Blur Contacts**: Hides contact names
- **Blur Photos**: Hides profile pictures

### Keyboard Shortcuts

- `Alt + B`: Open bulk sender
- `Ctrl/Cmd + Enter`: Start sending
- `Escape`: Stop sending
- `Alt + S`: Emergency stop

## ⚠️ Important Notes

1. **WhatsApp Limits**: WhatsApp has daily limits. Start with small batches
2. **Account Safety**: Using bulk messaging may risk your WhatsApp account
3. **Legal Compliance**: Ensure you have permission to message recipients
4. **No Warranty**: This tool is provided as-is without any guarantees

## 🔧 Troubleshooting

### Extension Not Working?
- Refresh WhatsApp Web page
- Check if you're logged into WhatsApp
- Disable other WhatsApp extensions

### Messages Not Sending?
- Check your internet connection
- Verify phone numbers include country code
- Try reducing the sending speed

### Excel Not Loading?
- Ensure file is .xlsx, .xls, or .csv format
- Check file size (keep under 5MB)
- Verify column headers match template

## 📝 Features Overview

✅ **All Features Unlocked**
- Unlimited message sending
- Excel/CSV import & export
- Personalized messages
- Attachment support
- Smart delays
- Contact validation
- Privacy blur options
- Progress tracking
- Pause/Resume functionality
- Export delivery reports

## 🆘 Support

For issues or questions:
1. Check the FAQ in the About tab
2. Review the tutorial videos (links in extension)
3. Report bugs through Chrome extension feedback

---

**Disclaimer**: This extension is not affiliated with WhatsApp. Use responsibly and in accordance with WhatsApp's Terms of Service.
