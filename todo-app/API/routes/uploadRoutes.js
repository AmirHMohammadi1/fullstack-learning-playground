const express = require('express');
const router = express.Router();
const uploadMiddleware = require('../middleware/upload');
const validationMiddleware = require('../middleware/validationUpload');
const uploadController = require('../controller/uploadController');

// Route صفحه اصلی
router.get('/', (req, res) => {
    res.send(`
        <h1>سیستم آپلود فایل با Middleware</h1>
        <p>از Route های زیر استفاده کنید:</p>
        <ul>
            <li>POST /api/upload/single - آپلود تک فایل</li>
            <li>POST /api/upload/multiple - آپلود چند فایل</li>
            <li>POST /api/upload/fields - آپلود فیلدهای مختلف</li>
            <li>GET /api/upload/download/:filename - دانلود فایل</li>
            <li>DELETE /api/upload/delete/:filename - حذف فایل</li>
        </ul>
    `);
});

// get نمایش صفحه آپلود
router.get('/uploadform', (req, res) => {
    res.render('upload')
})

// آپلود تک فایل
router.post('/single',
    uploadMiddleware.single('file', 2 * 1024 * 1024), // 2MB
    validationMiddleware.validateFileUpload,
    validationMiddleware.validateFileType(['image/jpeg', 'image/png']),
    uploadController.singleUpload
);

// آپلود چند فایل
router.post('/multiple',
    uploadMiddleware.multiple('files', 5, 10 * 1024 * 1024), // 5 فایل، هرکدام 10MB
    validationMiddleware.validateFileUpload,
    validationMiddleware.validateFileType(['image/jpeg', 'image/png', 'application/pdf']),
    uploadController.multipleUpload
);

// آپلود فیلدهای مختلف
router.post('/fields',
    uploadMiddleware.fields([
        { name: 'avatar', maxCount: 1 },
        { name: 'documents', maxCount: 3 },
        { name: 'gallery', maxCount: 5 }
    ]),
    validationMiddleware.validateFileUpload,
    uploadController.fieldsUpload
);

// آپلود به حافظه (برای پردازش قبل از ذخیره)
router.post('/memory',
    uploadMiddleware.memory('file', 2 * 1024 * 1024),
    validationMiddleware.validateFileUpload,
    async (req, res) => {
        // فایل در req.file.buffer موجود است
        // می‌توانید پردازش‌های لازم را انجام دهید
        res.json({
            success: true,
            message: 'فایل در حافظه آپلود شد',
            size: req.file.size
        });
    }
);

// Routes مدیریت فایل
router.get('/download/:filename', uploadController.downloadFile);
router.post('/delete/:filename', uploadController.deleteFile);

module.exports = router;