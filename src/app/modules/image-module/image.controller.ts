import { auth } from "@src/app/middlewares/auth/jwt.auth";
import { controller, httpPost } from "inversify-express-utils";

@controller("/images", auth)
export class ImageController {
  /**
   * 이미지 업로드
   * @path POST /api/images
   */
  @httpPost("/")
  uploadImage() {}
}
