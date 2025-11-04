const validateEmail = (req, res, next) => {
    const { to, subject, message } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!to || !emailRegex.test(to)) {
        return res.status(400).json({
            success: false,
            message: 'آدرس ایمیل معتبر نیست'
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

    next();
};


const rateLimit = require('express-rate-limit');

const emailRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 دقیقه
    max: 5, // حداکثر 5 درخواست در 15 دقیقه
    message: {
        success: false,
        message: 'تعداد درخواست‌های شما بیش از حد مجاز است. لطفا 15 دقیقه دیگر تلاش کنید.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = { emailRateLimiter, validateEmail }; 