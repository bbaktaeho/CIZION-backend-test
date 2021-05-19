import { User } from "@src/database/entities/user.entity";
import { IUser } from "@src/interfases/user.interface";
import { injectable } from "inversify";


@injectable()
export class UserRepository {
  async getUserById(id: number) {
    return await User.findOne(id, { loadRelationIds: true });
  }

  async getUserByEmail(email: string) {
    return await User.findOne(undefined, { where: { email } });
  }

  async createUser(userDto: IUser) {
    const { email, nickname, password } = userDto;
    const user = new User({ email, nickname, password });
    await user.save();
  }
}
