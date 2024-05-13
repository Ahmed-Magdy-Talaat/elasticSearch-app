const multer = require("multer");
exports.upload = () => {
  const fileFilter = (req, file, cb) => {
    if (file.mimetype == "application/pdf") cb(null, true);
    else
      cb(
        new Error("Invalid format. Only PDF and Word documents are allowed"),
        false
      );
  };
  return multer({ storage: multer.diskStorage({}), fileFilter });
};
