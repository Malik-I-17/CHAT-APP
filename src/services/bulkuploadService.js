const fs = require('fs');
const path = require('path');

const processBulkUpload = async (files) => {
    try {
        const uploadedFiles = [];
        for (const file of files) {
            const filePath = path.join(__dirname, '../uploads', file.originalname);
            fs.writeFileSync(filePath, file.buffer);
            uploadedFiles.push(filePath);
        }
        return uploadedFiles;
    } catch (error) {
        throw new Error('Bulk upload failed');
    }
};

module.exports = { processBulkUpload }