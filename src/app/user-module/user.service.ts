import { injectable } from "inversify";
import { Exception } from "../../common/exceptions/exception";
import { encryptPassword } from "../../common/utils/bcrypt.util";
import { IUser } from "../../common/interfases/user.interface";
import { UserRepository } from "../../repositories/user.repository";

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
}
