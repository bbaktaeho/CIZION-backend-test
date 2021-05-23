import multer, { Multer } from "multer";
import "dotenv/config";
import { existsSync, mkdirSync } from "fs";

const uploadImage: Multer = multer({
  fileFilter: (req, file, cb) => {
    if (!file) cb(new Error("not File"));
    else {
      const type = file.mimetype.split("/")[1].toLowerCase();
      if (type === "png" || type === "jpg" || type === "jpeg" || type === "gif") cb(null, true);
      else cb(null, false);
    }
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      if (!existsSync("upload")) mkdirSync("upload");
      cb(null, "upload");
    },
    filename: (req, file, cb) => {
      const type = file.mimetype.split("/")[1].toLowerCase();
      const imageName = `${Date.now()}.${type}`;
      // req.image = `${Date.now()}.${type}`;
      cb(null, imageName);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 },
});

export const upload = () => uploadImage.single("image");
