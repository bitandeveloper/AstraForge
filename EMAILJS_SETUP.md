# EmailJS Setup Guide for Astra Forge

To make the contact form send emails directly to your Gmail (`berabitan.14@gmail.com`), follow these steps to configure EmailJS.

## 1. Create an EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/) and sign up for a **Free** account.

## 2. Connect Your Gmail (Service)
1. In the EmailJS Dashboard, go to **"Email Services"**.
2. Click **"Add New Service"**.
3. Select **"Gmail"**.
4. Click **"Connect Account"** and login with `berabitan.14@gmail.com`.
5. Click **"Create Service"**.
6. **IMPORTANT:** Copy user **Service ID** (e.g., `service_xxxxxx`) and save it.

## 3. Create an Email Template
1. Go to **"Email Templates"** on the left sidebar.
2. Click **"Create New Template"**.
3. **Subject Line**:
   - Set to: `New Protocol Logic from {{name}}` (or similar)
4. **Content**:
   - Design the email body to look like this:
     ```
     New Project Inquiry:
     
     Name: {{name}}
     Email: {{email}}
     Service: {{service_type}}
     
     Message:
     {{message}}
     ```
   - *Note: The names inside {{ }} must match the `name` attributes in your HTML form (`name`, `email`, `service_type`, `message`).*
5. **To Email**:
   - Ensure this is set to `{{email}}` (to reply to user) or simply check your own email inbox settings. Usually, it sends *to* your registered email by default.
6. Click **"Save"**.
7. **IMPORTANT:** Copy your **Template ID** (e.g., `template_xxxxxx`) and save it.

## 4. Get Your Public Key
1. Go to **"Account"** (or click your avatar in top right -> Account).
2. Look for **"Public Key"**.
3. **IMPORTANT:** Copy your **Public Key** (e.g., `user_xxxxxx` or a long random string).

## 5. Add Keys to Your Website
You now have 3 keys. You need to paste them into your code.

### Step A: Public Key
Open `contact.html` and find the script near the bottom:
```javascript
emailjs.init("YOUR_PUBLIC_KEY");
```
Replace `"YOUR_PUBLIC_KEY"` with your actual key.

### Step B: Service & Template IDs
Open `js/main.js` and find the `submit` handler:
```javascript
const serviceID = 'YOUR_SERVICE_ID';
const templateID = 'YOUR_TEMPLATE_ID';
```
Replace placeholder text with your actual **Service ID** and **Template ID**.

---

## 6. Test It!
1. Open your website (`index.html` or live URL).
2. Go to Contact page.
3. Fill out the form.
4. Click "Submit Proposal".
5. You should see "Protocol Sent Successfully" and receive an email in your Gmail!
