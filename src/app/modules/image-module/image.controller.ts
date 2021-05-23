import { auth } from "@src/app/middlewares/auth/jwt.auth";
import { controller, httpPost } from "inversify-express-utils";
import { upload } from "./middlewares/image.upload";
import { Request, Response } from "express";
import { serverConfig } from "@src/common/configs/server.config";

@controller("/images", auth)
export class ImageController {
  /**
   * 이미지 업로드
   * @path POST /api/images
   * @body field = image
   */
  @httpPost("/", upload())
  uploadImage(req: Request, res: Response) {
    const path = `http://${serverConfig.host}:${serverConfig.port}/${req.file.path}`;
    res.status(201).json({ path });
  }
}
