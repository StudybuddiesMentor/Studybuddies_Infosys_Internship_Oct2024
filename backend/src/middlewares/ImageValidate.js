const MAX_SIZE = 5 * 1024 * 1024; 

const ValidateSize = (req, res, next) => {
    const file = req.file; 
    if (file) {
        if (file.size > MAX_SIZE) {
            
            return res.status(400).json({ message: 'Error: File too large. Maximum file size is 5 MB.' });
        }
    }
    next(); 
};




export default ValidateSize;