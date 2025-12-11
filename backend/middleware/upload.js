const multer = require("multer");
const path = require("path");

// Storage settings
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// File filter (only images)
const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/webp"];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Formato de imagen no permitido"), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
