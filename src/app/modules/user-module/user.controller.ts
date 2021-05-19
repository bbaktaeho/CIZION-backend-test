import { controller, httpGet, httpPost } from "inversify-express-utils";
import { Request, Response } from "express";
import { UserService } from "./user.service";
import { validateRegister } from "./middlewares/signup.validator";
import { auth } from "../middlewares/auth/jwt.auth";

@controller("/users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 회원 가입
   * @body {email: string, nickname: string, password: string}
   * @path POST /api/users/
   */
  @httpPost("/", validateRegister)
  async register(req: Request, res: Response) {
    await this.userService.register(req.body);
    res.status(201).end();
  }

  /**
   * 사용자 정보
   * @path GET /api/users/{id}
   */
  @httpGet("/:id")
  async getUser(req: Request, res: Response) {
    const user = await this.userService.getUser(+req.params.id);
    res.status(200).json(user);
  }
}
