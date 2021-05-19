import { injectable } from "inversify";
import { User } from "../database/entities/user.entity";
import { IUser } from "../common/interfases/user.interface";

@injectable()
export class UserRepository {
  async getUserById(id: number): Promise<IUser | undefined> {
    return await User.findOne(id);
  }

  async getUserByEmail(email: string): Promise<IUser | undefined> {
    return await User.findOne(undefined, { where: { email } });
  }

  async createUser(userDto: IUser): Promise<IUser> {
    const { email, nickname, password } = userDto;
    const user = new User({ email, nickname, password });
    return await user.save();
  }
}
