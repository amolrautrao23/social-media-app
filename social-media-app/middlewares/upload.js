import multer from "multer";
import { extname, join, dirname } from "path";
import { mkdirSync, existsSync, unlink } from "fs";
import { log } from "console";

const { diskStorage } = multer;

// Allowed extensions (can be made dynamic if needed)
const allowedImageTypes = /\.(jpeg|jpg|png|ico|webp|svg)$/;

const fileFilter = (req, file, cb) => {
  if (!allowedImageTypes.test(extname(file.originalname).toLowerCase())) {
    return cb(new Error("Invalid file type. Only JPEG, PNG, ICO, WEBP, or SVG are allowed."));
  }
  cb(null, true);
};

// Auto-create folder if not exists
function ensureDirExist(path) {
  if (!existsSync(path)) {
    mkdirSync(path, { recursive: true });
  }
}

// Dynamic storage based on field config
const storage = diskStorage({
  destination: (req, file, cb) => {
    const fieldConfig = req.uploadConfig.find(f => f.name === file.fieldname);
    if (!fieldConfig) {
      return cb(new Error("No destination configured for field: " + file.fieldname));
    }
    const destPath = join(process.cwd(), fieldConfig.destination);
    ensureDirExist(destPath);
    cb(null, destPath);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const fieldConfig = req.uploadConfig.find(f => f.name === file.fieldname);
    const prefix = fieldConfig?.prefix || ''; // fallback
    console.log("Prefix:", `${prefix ? prefix + "_" : ""}${timestamp}_${file.originalname}`);
    cb(null, `${prefix ? prefix + "_" : ""}${timestamp}_${file.originalname}`);
  }
});

// Create multer middleware
export function createUploadMiddleware(config) {
  const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB
  });

  return (req, res, next) => {
    req.uploadConfig = config;

    upload.fields(config)(req, res, (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      next();
    });
  };
}

// Delete uploaded files (for validation fail or error)
export function deleteUploadedFiles(files) {
  if (!files) return;
  Object.values(files).forEach(fileArray => {
    fileArray.forEach(file => {
      unlink(file.path, err => {
        if (err) console.error("Failed to delete file:", file.path, err);
      });
    });
  });
}
