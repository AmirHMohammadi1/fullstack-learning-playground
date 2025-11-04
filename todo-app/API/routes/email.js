const express = require('express');
const router = express.Router();
const emailService = require('../services/emailService');
const emailConfig = require('../config/emailConfig');
const emailService2 = require('../services/emailService');

// middleware اعتبارسنجی
const validateEmail = (req, res, next) => {
  const { to, subject, message } = req.body;
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!to) {
    return res.status(400).json({
      success: false,
      message: 'آدرس ایمیل گیرنده الزامی است'
    });
  }
  
  // بررسی چند ایمیل (جداشده با کاما)
  const emails = to.split(',').map(email => email.trim());
  const invalidEmails = emails.filter(email => !emailRegex.test(email));
  
  if (invalidEmails.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'آدرس ایمیل معتبر نیست',
      invalidEmails: invalidEmails
    });
  }
  
  if (!subject || subject.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: 'موضوع ایمیل الزامی است'
    });
  }
  
  if (!message || message.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: 'متن ایمیل الزامی است'
    });
  }
  
  req.validatedEmails = emails;
  next();
};

// تست اتصال
router.get('/test', async (req, res) => {
  try {
    const isConnected = await emailConfig.testConnection();
    
    res.json({
      success: isConnected,
      message: isConnected ? 
        'اتصال به Gmail با موفقیت برقرار شد ✅' : 
        'خطا در اتصال به Gmail ❌',
      config: {
        service: 'gmail',
        user: process.env.EMAIL_USER,
        hasPassword: !!process.env.EMAIL_PASS
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'خطا در تست اتصال',
      error: error.message
    });
  }
});

// ارسال ایمیل تست
router.post('/send-test', validateEmail, async (req, res) => {
  try {
    const { to } = req.body;
    
    const result = await emailService.sendTestEmail(req.validatedEmails[0]);
    
    res.json({
      success: true,
      message: 'ایمیل تست با موفقیت ارسال شد',
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'خطا در ارسال ایمیل تست',
      error: error.message
    });
  }
});

// ارسال ایمیل سفارشی
router.post('/send', validateEmail, async (req, res) => {
  try {
    const { subject, message } = req.body;
    const recipients = req.validatedEmails;
    
    const results = [];
    
    for (const recipient of recipients) {
      try {
        const result = await emailService.sendEmail({
          to: recipient,
          subject: subject,
          text: message,
          html: `
            <div dir="rtl" style="font-family: Tahoma; padding: 20px; line-height: 1.6;">
              <h2 style="color: #333;">${subject}</h2>
              <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
                ${message.replace(/\n/g, '<br>')}
              </div>
              <hr style="border: none; border-top: 1px solid #e0e0e0;">
              <p style="color: #666; font-size: 12px;">
                این ایمیل از سرویس Express.js ارسال شده است
              </p>
            </div>
          `
        });
        results.push({ recipient, success: true, data: result });
      } catch (error) {
        results.push({ recipient, success: false, error: error.message });
      }
    }
    
    const allSuccess = results.every(r => r.success);
    
    res.json({
      success: allSuccess,
      message: allSuccess ? 
        `تمام ایمیل‌ها (${results.length}) با موفقیت ارسال شدند` :
        `برخی ایمیل‌ها با خطا مواجه شدند`,
      results: results
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'خطا در ارسال ایمیل',
      error: error.message
    });
  }
});

// اطلاعات پیکربندی (بدون نمایش رمز عبور)
router.get('/config', (req, res) => {
  res.json({
    service: 'gmail',
    user: process.env.EMAIL_USER,
    fromName: process.env.EMAIL_FROM_NAME,
    hasAppPassword: !!process.env.EMAIL_PASS,
    passwordLength: process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : 0
  });
});

// روت تست ارسال ایمیل
router.post('/send-test2', async (req, res) => {
  try {
    const { to, subject, message } = req.body;

    if (!to || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'پارامترهای to, subject, message الزامی هستند'
      });
    }

    const result = await emailService2.sendSimpleEmail(
      to,
      subject,
      message,
      `<p>${message}</p>`
    );

    res.json({
      success: true,
      message: 'ایمیل با موفقیت ارسال شد',
      data: result
    });
  } catch (error) {
    console.error('خطا:', error);
    res.status(500).json({
      success: false,
      message: 'خطا در ارسال ایمیل',
      error: error.message
    });
  }
});

// روت ارسال ایمیل خوش‌آمدگویی
router.post('/send-welcome', async (req, res) => {
  try {
    const { to, name } = req.body;

    if (!to || !name) {
      return res.status(400).json({
        success: false,
        message: 'پارامترهای to و name الزامی هستند'
      });
    }

    const result = await emailService2.sendTemplateEmail(
      to,
      'خوش آمدید به سرویس ما',
      'welcome',
      { name: name }
    );

    res.json({
      success: true,
      message: 'ایمیل خوش‌آمدگویی ارسال شد',
      data: result
    });
  } catch (error) {
    console.error('خطا:', error);
    res.status(500).json({
      success: false,
      message: 'خطا در ارسال ایمیل خوش‌آمدگویی',
      error: error.message
    });
  }
});

// روت ارسال ایمیل با فایل پیوست
router.post('/send-with-attachment', async (req, res) => {
  try {
    const { to, subject, message } = req.body;

    const attachments = [
      {
        filename: 'example.pdf',
        path: './assets/example.pdf', // مسیر فایل شما
        contentType: 'application/pdf'
      },
      {
        filename: 'image.jpg',
        path: './assets/image.jpg',
        contentType: 'image/jpeg'
      }
    ];

    const result = await emailService2.sendEmailWithAttachment(
      to,
      subject,
      message,
      `<p>${message}</p>`,
      attachments
    );

    res.json({
      success: true,
      message: 'ایمیل با پیوست ارسال شد',
      data: result
    });
  } catch (error) {
    console.error('خطا:', error);
    res.status(500).json({
      success: false,
      message: 'خطا در ارسال ایمیل با پیوست',
      error: error.message
    });
  }
});

module.exports = router;