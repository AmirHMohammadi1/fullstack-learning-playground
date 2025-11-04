const emailConfig = require('../config/emailConfig');

// کلاس ارسال ایمیل برای تست و تایید و ...
class EmailService {
  constructor() {
    this.transporter = emailConfig.getTransporter();
    this.setupEventListeners();
  }

  setupEventListeners() {
    if (this.transporter) {
      this.transporter.on('token', (token) => {
        console.log('🔑 توکن جدید دریافت شد:', token);
      });

      this.transporter.on('idle', () => {
        console.log('📧 ایمیل‌ها ارسال شدند، اتصال بسته شد');
      });
    }
  }

  async sendEmail(mailOptions) {
    try {
      // افزودن اطلاعات پیش‌فرض
      const defaultOptions = {
        from: {
          name: process.env.EMAIL_FROM_NAME || 'سرویس ما',
          address: process.env.EMAIL_USER
        },
        ...mailOptions
      };

      const result = await this.transporter.sendMail(defaultOptions);
      
      console.log('✅ ایمیل ارسال شد:', {
        to: mailOptions.to,
        subject: mailOptions.subject,
        messageId: result.messageId
      });

      return {
        success: true,
        messageId: result.messageId,
        response: result.response
      };
    } catch (error) {
      console.error('❌ خطا در ارسال ایمیل:', error.message);
      throw this.handleError(error);
    }
  }

  handleError(error) {
    // مدیریت خطاهای خاص Gmail
    switch (error.code) {
      case 'EAUTH':
        return new Error('خطای احراز هویت: رمز برنامه نامعتبر است');
      
      case 'EENVELOPE':
        return new Error('خطای اطلاعات ایمیل: آدرس گیرنده نامعتبر است');
      
      case 'EMESSAGE':
        return new Error('خطای محتوای ایمیل: محتوا نامعتبر است');
      
      case 'ECONNECTION':
        return new Error('خطای اتصال: مشکل در ارتباط با سرور Gmail');
      
      default:
        if (error.response) {
          if (error.response.includes('550')) {
            return new Error('ایمیل گیرنده وجود ندارد');
          }
          if (error.response.includes('535')) {
            return new Error('خطای احراز هویت: نام کاربری یا رمز عبور نادرست');
          }
          if (error.response.includes('454')) {
            return new Error('خطای TLS: ارتباط امن برقرار نشد');
          }
        }
        return error;
    }
  }

  // متدهای کمکی
  async sendTestEmail(to) {
    return this.sendEmail({
      to: to,
      subject: 'تست اتصال Gmail - ' + new Date().toLocaleString('fa-IR'),
      text: 'این یک ایمیل تست از سرویس Express.js با Gmail است.',
      html: `
        <div dir="rtl" style="font-family: Tahoma; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <h2 style="color: #4285f4;">✅ تست اتصال Gmail موفق بود</h2>
          <p>این ایمیل برای تست اتصال سرویس ایمیل ارسال شده است.</p>
          <p><strong>زمان ارسال:</strong> ${new Date().toLocaleString('fa-IR')}</p>
          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">
            سرویس ایمیل Express.js با پیکربندی Gmail
          </p>
        </div>
      `
    });
  }

  async sendBulkEmails(recipients, subject, message) {
    const results = [];
    
    for (const recipient of recipients) {
      try {
        const result = await this.sendEmail({
          to: recipient,
          subject: subject,
          html: `
            <div dir="rtl" style="font-family: Tahoma; padding: 20px;">
              <h3>${subject}</h3>
              <p>${message}</p>
            </div>
          `
        });
        results.push({ recipient, success: true, result });
      } catch (error) {
        results.push({ recipient, success: false, error: error.message });
      }
      
      // تاخیر برای جلوگیری از rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    return results;
  }
}

module.exports = new EmailService();

// ===========================

// const emailConfig = require('../config/emailConfig');
const path = require('path');
const fs = require('fs');

class EmailService2 {
  constructor() {
    this.transporter = emailConfig.getTransporter();
  }

  // ارسال ایمیل ساده
  async sendSimpleEmail(to, subject, text, html) {
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: subject,
        text: text,
        html: html
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('ایمیل با موفقیت ارسال شد:', result.messageId);
      return result;
    } catch (error) {
      console.error('خطا در ارسال ایمیل:', error);
      throw error;
    }
  }

  // ارسال ایمیل با تمپلیت
  async sendTemplateEmail(to, subject, templateName, templateData) {
    try {
      const templatePath = path.join(__dirname, '../templates/emails', `${templateName}.html`);
      let html = fs.readFileSync(templatePath, 'utf8');
      
      // جایگزینی داده‌ها در تمپلیت
      Object.keys(templateData).forEach(key => {
        const regex = new RegExp(`{{${key}}}`, 'g');
        html = html.replace(regex, templateData[key]);
      });

      return await this.sendSimpleEmail(to, subject, null, html);
    } catch (error) {
      console.error('خطا در ارسال ایمیل تمپلیت:', error);
      throw error;
    }
  }

  // ارسال ایمیل با فایل پیوست
  async sendEmailWithAttachment(to, subject, text, html, attachments) {
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: subject,
        text: text,
        html: html,
        attachments: attachments
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('ایمیل با پیوست ارسال شد:', result.messageId);
      return result;
    } catch (error) {
      console.error('خطا در ارسال ایمیل با پیوست:', error);
      throw error;
    }
  }

  // ارسال ایمیل به چندین کاربر
  async sendBulkEmail(recipients, subject, text, html) {
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        bcc: recipients, // استفاده از BCC برای حفظ حریم خصوصی
        subject: subject,
        text: text,
        html: html
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('ایمیل گروهی ارسال شد:', result.messageId);
      return result;
    } catch (error) {
      console.error('خطا در ارسال ایمیل گروهی:', error);
      throw error;
    }
  }
}

module.exports = new EmailService2();