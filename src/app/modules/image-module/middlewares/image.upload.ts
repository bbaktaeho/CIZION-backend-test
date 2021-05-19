import multer, { Multer } from "multer";

const uploadImage: Multer = multer({
  fileFilter: (req, file, cb) => {
    if (!file) cb(new Error("not File"));
    else {
      const type = file.mimetype.split("/")[1];
    }
  },
});
