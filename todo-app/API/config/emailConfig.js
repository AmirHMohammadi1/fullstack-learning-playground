const nodemailer = require('nodemailer');

class EmailConfig {
  constructor() {
    this.transporter = null;
    this.init();
  }

  init() {
    try {
      this.transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        },
        tls: {
          rejectUnauthorized: false
        },
        // تنظیمات اضافی برای بهبود عملکرد
        pool: true,
        maxConnections: 5,
        maxMessages: 100,
        rateDelta: 1000,
        rateLimit: 5
      });

      console.log('📧 پیکربندی ایمیل بارگذاری شد');
    } catch (error) {
      console.error('❌ خطا در پیکربندی ایمیل:', error.message);
    }
  }

  async testConnection() {
    try {
      if (!this.transporter) {
        throw new Error('Transporter تعریف نشده است');
      }

      await this.transporter.verify();
      console.log('✅ اتصال به Gmail با موفقیت برقرار شد');
      return true;
    } catch (error) {
      console.error('❌ خطا در اتصال به Gmail:', error.message);
      return false;
    }
  }

  getTransporter() {
    return this.transporter;
  }
}

module.exports = new EmailConfig();