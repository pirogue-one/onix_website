# Bitrix24 Integration Setup Instructions

## Overview
The JavaScript file `js/bitrix24.js` has been created to replace the PHP functionality and integrate your website forms with Bitrix24 CRM.

## Setup Steps

### 1. Get Your Bitrix24 Webhook URL
1. Log in to your Bitrix24 account
2. Go to **Applications** → **Webhooks** → **Incoming webhooks**
3. Click **Add webhook**
4. Select **CRM** permissions
5. Copy the webhook URL (it looks like: `https://your-site.bitrix24.ru/rest/1/your-token/crm.lead.add.json`)

### 2. Configure the JavaScript File
Open `js/bitrix24.js` and update the configuration:

```javascript
// Replace these values with your actual Bitrix24 credentials
this.siteName = 'your-site-name'; // Extract from your webhook URL
this.token = 'your-webhook-token'; // Extract from your webhook URL
```

**Example:**
If your webhook URL is: `https://mycompany.bitrix24.ru/rest/1/abc123def456/crm.lead.add.json`
Then set:
```javascript
this.siteName = 'mycompany';
this.token = 'abc123def456';
```

### 3. Alternative Configuration Method
You can also update the configuration after the page loads by calling:

```javascript
// After the page loads, update the configuration
window.bitrix24Integration.updateConfig('your-site-name', 'your-webhook-token');
```

## Features

### ✅ What's Included
- **Form Integration**: Works with both main contact form and popup callback form
- **Data Validation**: Validates required fields and formats
- **Phone Formatting**: Maintains existing phone number formatting
- **Error Handling**: Shows user-friendly error messages
- **Success Feedback**: Confirms successful form submission
- **Loading States**: Shows loading indicators during submission
- **Auto-popup Close**: Closes popup after successful submission

### 📋 Form Fields Mapped
- **NAME**: Customer's first name
- **LAST_NAME**: Customer's last name (optional)
- **PHONE**: Phone number (required, formatted)
- **EMAIL**: Email address (optional, validated)
- **MESSAGE**: Additional message (optional)
- **SOURCE**: Automatically set based on form type

### 🔧 Technical Details
- Uses modern JavaScript `fetch()` API instead of cURL
- Handles CORS properly for Bitrix24 API
- Maintains the same data structure as the original PHP code
- Includes proper error handling and user feedback
- No server-side dependencies required

## Testing

### 1. Test the Integration
1. Open your website
2. Fill out the contact form or popup form
3. Submit the form
4. Check your Bitrix24 CRM for new leads

### 2. Debug Issues
- Open browser Developer Tools (F12)
- Check the Console tab for any error messages
- Verify your webhook URL and permissions in Bitrix24

## Troubleshooting

### Common Issues

**1. CORS Errors**
- Ensure your webhook has proper permissions
- Check that the webhook URL is correct

**2. Form Not Submitting**
- Verify the form has proper `name` attributes
- Check browser console for JavaScript errors

**3. Data Not Appearing in Bitrix24**
- Verify webhook permissions include CRM access
- Check that the webhook token is correct
- Ensure the webhook is active in Bitrix24

### Debug Mode
To enable debug logging, add this to your browser console:
```javascript
// Enable debug mode
window.bitrix24Integration.debug = true;
```

## Security Notes

- The webhook token is visible in the client-side code
- This is normal for Bitrix24 webhooks as they're designed for client-side use
- Webhook permissions should be limited to only what's needed (CRM leads)
- Consider using a separate webhook for production vs development

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify your Bitrix24 webhook configuration
3. Test with a simple form submission first
4. Ensure all required fields are filled out

## Migration from PHP

The JavaScript version maintains compatibility with your existing forms and provides the same functionality as the original PHP code, but with better user experience and no server-side dependencies.
