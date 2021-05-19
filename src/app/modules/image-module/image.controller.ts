import { controller, httpPost } from "inversify-express-utils";
import { auth } from "../middlewares/auth/jwt.auth";

@controller("/images", auth)
export class ImageController {
  /**
   * 이미지 업로드
   * @path POST /api/images
   */
  @httpPost("/")
  uploadImage() {}
}
