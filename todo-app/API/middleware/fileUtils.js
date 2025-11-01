const fs = require('fs').promises;
const path = require('path');

const fileUtils = {
    // حذف فایل
    deleteFile: async (filePath) => {
        try {
            await fs.unlink(filePath);
            return true;
        } catch (error) {
            console.error('خطا در حذف فایل:', error);
            return false;
        }
    },

    // دریافت اطلاعات فایل
    getFileInfo: (file) => {
        return {
            filename: file.filename,
            originalname: file.originalname,
            size: file.size,
            mimetype: file.mimetype,
            path: file.path,
            category: file.category || 'general'
        };
    },

    // بررسی وجود فایل
    fileExists: async (filePath) => {
        try {
            await fs.access(filePath);
            return true;
        } catch {
            return false;
        }
    },

    // دریافت لیست فایل‌های یک دایرکتوری
    listFiles: async (dirPath) => {
        try {
            const files = await fs.readdir(dirPath);
            const fileList = [];
            
            for (const file of files) {
                const filePath = path.join(dirPath, file);
                const stats = await fs.stat(filePath);
                
                fileList.push({
                    name: file,
                    path: filePath,
                    size: stats.size,
                    modified: stats.mtime,
                    isDirectory: stats.isDirectory()
                });
            }
            
            return fileList;
        } catch (error) {
            throw new Error(`خطا در خواندن دایرکتوری: ${error.message}`);
        }
    }
};

module.exports = fileUtils;