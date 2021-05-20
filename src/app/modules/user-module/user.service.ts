import { Exception } from "@src/common/exceptions/exception";
import { encryptPassword } from "@src/common/utils/bcrypt.util";
import { IUser } from "@src/interfases/user.interface";
import { UserRepository } from "@src/repositories/user.repository";
import { injectable } from "inversify";

@injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async register(userDto: IUser): Promise<void> {
    const exists = await this.userRepository.getUserByEmail(userDto.email);
    if (exists) throw Exception.new(409, "이메일 중복");

    userDto.password = encryptPassword(userDto.password);
    await this.userRepository.createUser(userDto);
  }

  async getUser(id: number): Promise<IUser> {
    const user = await this.userRepository.getUserById(id);
    if (!user) throw Exception.new(404, "없는 사용자");
    user.password = "";
    return user;
  }

  async account(userId: number): Promise<IUser> {
    const user = await this.userRepository.getMyAccount(userId);
    user.password = "";
    return user;
  }
}
