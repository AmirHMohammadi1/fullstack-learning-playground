const fileUtils = require('../middleware/fileUtils');
const path = require('path')

const uploadController = {
    // آپلود تک فایل
    singleUpload: async (req, res) => {
        try {
            const fileInfo = fileUtils.getFileInfo(req.file);
            
            res.json({
                success: true,
                message: 'فایل با موفقیت آپلود شد',
                data: {
                    file: fileInfo,
                    downloadUrl: `/upload/${req.file.filename}`
                }
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'خطا در پردازش فایل'
            });
        }
    },

    // آپلود چند فایل
    multipleUpload: async (req, res) => {
        try {
            const filesInfo = req.files.map(file => fileUtils.getFileInfo(file));
            
            res.json({
                success: true,
                message: `${req.files.length} فایل با موفقیت آپلود شد`,
                data: {
                    files: filesInfo,
                    totalSize: filesInfo.reduce((sum, file) => sum + file.size, 0)
                }
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'خطا در پردازش فایل‌ها'
            });
        }
    },

    // آپلود فیلدهای مختلف
    fieldsUpload: async (req, res) => {
        try {
            const result = {};
            
            for (const [fieldName, files] of Object.entries(req.files)) {
                result[fieldName] = files.map(file => fileUtils.getFileInfo(file));
            }
            
            res.json({
                success: true,
                message: 'فایل‌ها با موفقیت آپلود شدند',
                data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'خطا در پردازش فایل‌ها'
            });
        }
    },

    // دانلود فایل
    downloadFile: async (req, res) => {
        try {
            const filename = req.params.filename;
            // console.log(filename)
            // در واقعیت باید از دیتابیس مسیر فایل را پیدا کنید
            const filePath = path.join(__dirname, '../uploads/anonymous', filename);
            
            if (await fileUtils.fileExists(filePath)) {
                res.download(filePath);
            } else {
                res.status(404).json({
                    success: false,
                    error: 'فایل یافت نشد'
                });
            }
        } catch (error) {
            // console.error(error)
            res.status(500).json({
                success: false,
                error: 'خطا در دانلود فایل'
            });
        }
    },

    // حذف فایل
    deleteFile: async (req, res) => {
        try {
            const filename = req.params.filename;
            const filePath = path.join(__dirname, '../uploads/anonymous', filename);
            // console.log(filename)
            if (await fileUtils.deleteFile(filePath)) {
                res.json({
                    success: true,
                    message: 'فایل با موفقیت حذف شد'
                });
            } else {
                res.status(404).json({
                    success: false,
                    error: 'فایل یافت نشد'
                });
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'خطا در حذف فایل'
            });
        }
    }
};

module.exports = uploadController;