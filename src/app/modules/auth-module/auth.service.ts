import { Exception } from "@src/common/exceptions/exception";
import { isPassword } from "@src/common/utils/bcrypt.util";
import { generateAccessToken } from "@src/common/utils/jwt.util";
import { IUser } from "@src/interfases/user.interface";
import { UserRepository } from "@src/repositories/user.repository";
import { injectable } from "inversify";


@injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async login(userDto: IUser): Promise<string> {
    const user = await this.userRepository.getUserByEmail(userDto.email);
    if (!user) throw Exception.new(404, "가입하지 않은 이메일");

    if (isPassword(userDto.password, user.password)) return await generateAccessToken({ ...user });
    else throw Exception.new(403, "비밀번호 틀림");
  }
}
