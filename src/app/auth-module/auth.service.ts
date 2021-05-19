import { injectable } from "inversify";
import { Exception } from "../../common/exceptions/exception";
import { IUser } from "../../common/interfases/user.interface";
import { isPassword } from "../../common/utils/bcrypt.util";
import { createUserToken } from "../../common/utils/jwt.util";
import { UserRepository } from "../../repositories/user.repository";

@injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async login(userDto: IUser): Promise<string> {
    const user = await this.userRepository.getUserByEmail(userDto.email);
    if (!user) throw Exception.new(404, "가입하지 않은 이메일");

    if (isPassword(userDto.password, user.password)) return await createUserToken({ ...user });
    else throw Exception.new(403, "비밀번호 틀림");
  }
}
