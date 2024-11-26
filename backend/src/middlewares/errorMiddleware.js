import multer from "multer";

const errorHandler = (err, req, res, next) => {
  // Handle Multer errors
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        message: "Error: File too large. Maximum file size is 5 MB.",
        errorCode: err.code,
      });
    }
    if (err.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({
        message: "Error: Unexpected file type or field name.",
        errorCode: err.code,
      });
    }
  }

  // Handle custom errors
  if (err.message && err.message.includes("Invalid file type")) {
    return res.status(400).json({ message: err.message });
  }

  if (err.message && err.message.includes("File size is too small")) {
    return res.status(400).json({ message: err.message });
  }

  // Default error response
  res.status(err.status || 500).json({
    message: "Something went wrong!",
    error: err.message || err,
  });
};

export default errorHandler;
