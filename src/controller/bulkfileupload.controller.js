const { processBulkUpload } = require('../services/bulkuploadService');

const bulkFileUpload = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'No files uploaded' });
        }

        const filePaths = await processBulkUpload(req.files);

        return res.status(200).json({ message: 'Files uploaded successfully', files: filePaths });

    } catch (error) {
        console.error('Bulk Upload Error:', error);
        return res.status(500).json({ message: 'File processing failed', error: error.message });
    }
};

module.exports = { bulkFileUpload };
