const validateFileUpload = (req, res, next) => {
    if (!req.file && (!req.files || req.files.length === 0)) {
        return res.status(400).json({
            success: false,
            error: 'هیچ فایلی برای آپلود ارسال نشده است'
        });
    }
    next();
};

const validateFileType = (allowedTypes) => {
    return (req, res, next) => {
        const files = req.file ? [req.file] : req.files || [];
        
        for (const file of files) {
            if (!allowedTypes.includes(file.mimetype)) {
                return res.status(400).json({
                    success: false,
                    error: `نوع فایل ${file.originalname} مجاز نیست. انواع مجاز: ${allowedTypes.join(', ')}`
                });
            }
        }
        next();
    };
};

const validateFileSize = (maxSize) => {
    return (req, res, next) => {
        const files = req.file ? [req.file] : req.files || [];
        
        for (const file of files) {
            if (file.size > maxSize) {
                return res.status(400).json({
                    success: false,
                    error: `حجم فایل ${file.originalname} بیش از حد مجاز است (${maxSize / 1024 / 1024}MB)`
                });
            }
        }
        next();
    };
};

module.exports = {
    validateFileUpload,
    validateFileType,
    validateFileSize
};