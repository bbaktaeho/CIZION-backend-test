import { controller, httpPost } from "inversify-express-utils";
import { AuthService } from "./auth.service";
import { Request, Response } from "express";
import { validateLogin } from "./middlewares/login.validator";

@controller("/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * 로그인
   * @body {email: string, password: string}
   * @path POST /api/auth/login
   */
  @httpPost("/login", validateLogin)
  async login(req: Request, res: Response) {
    const accessToken = await this.authService.login(req.body);
    res.status(201).json({ token: accessToken });
  }
}
