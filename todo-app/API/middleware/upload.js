const multer = require('multer');
const path = require('path');
const fs = require('fs');

// ایجاد پوشه آپلود اگر وجود ندارد
const ensureUploadsDir = (req, res, next) => {
    const uploadsDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
    }
    next();
};

// پیکربندی storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const userDir = path.join(__dirname, '../uploads', req.user?.id || 'anonymous');
        if (!fs.existsSync(userDir)) {
            fs.mkdirSync(userDir, { recursive: true });
        }
        cb(null, userDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const safeFilename = file.originalname.replace(/[^a-zA-Z0-9.\-]/g, '_');
        cb(null, uniqueSuffix + '-' + safeFilename);
    }
});

// فیلتر انواع فایل
const fileFilter = (req, file, cb) => {
    const allowedMimes = {
        'image': ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
        'document': ['application/pdf', 'text/plain', 'application/msword'],
        'archive': ['application/zip', 'application/x-rar-compressed']
    };

    const fileCategory = Object.keys(allowedMimes).find(category => 
        allowedMimes[category].includes(file.mimetype)
    );

    if (fileCategory) {
        req.fileCategory = fileCategory;
        cb(null, true);
    } else {
        cb(new Error(`نوع فایل ${file.mimetype} مجاز نیست!`), false);
    }
};

// ایجاد instance های مختلف multer
const createUploader = (options = {}) => {
    return multer({
        storage: storage,
        fileFilter: fileFilter,
        limits: {
            fileSize: options.maxFileSize || 5 * 1024 * 1024, // 5MB پیش‌فرض
            files: options.maxFiles || 10
        }
    });
};

// میدلورهای آماده
const uploadMiddleware = {
    // میدلور پایه
    base: [ensureUploadsDir],

    // آپلود تک فایل
    single: (fieldName = 'file', maxFileSize = 5 * 1024 * 1024) => {
        const uploader = createUploader({ maxFileSize });
        return [...uploadMiddleware.base, uploader.single(fieldName)];
    },

    // آپلود چند فایل
    multiple: (fieldName = 'files', maxCount = 5, maxFileSize = 5 * 1024 * 1024) => {
        const uploader = createUploader({ maxFileSize, maxFiles: maxCount });
        return [...uploadMiddleware.base, uploader.array(fieldName, maxCount)];
    },

    // آپلود فیلدهای مختلف
    fields: (fieldsConfig, maxFileSize = 5 * 1024 * 1024) => {
        const uploader = createUploader({ maxFileSize });
        return [...uploadMiddleware.base, uploader.fields(fieldsConfig)];
    },

    // آپلود بدون ذخیره (حافظه)
    memory: (fieldName = 'file', maxFileSize = 5 * 1024 * 1024) => {
        const memoryStorage = multer.memoryStorage();
        const uploader = multer({
            storage: memoryStorage,
            fileFilter: fileFilter,
            limits: { fileSize: maxFileSize }
        });
        return [...uploadMiddleware.base, uploader.single(fieldName)];
    }
};

module.exports = uploadMiddleware;