// middleware/upload.js
import multer from "multer";

const storage = multer.diskStorage({});
const upload = multer({ storage });

export default upload;
