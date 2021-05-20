import { Comment } from "@src/database/entities/comment.entity";
import { User } from "@src/database/entities/user.entity";
import { IComment } from "@src/interfases/comment.interface";
import { injectable } from "inversify";

@injectable()
export class CommentRepository {
  async create(commentDto: IComment, parentId: number = 0) {
    const { body } = commentDto;
    const comment = new Comment({ body });
    await comment.save();
  }

  async update(commentDto: IComment, id: number) {
    const { body } = commentDto;
    await Comment.update({ id }, { body });
  }

  //   async findAll() {}
  async findOne(id: number) {
    return await Comment.findOne(id);
  }

  async like(id: number, user: User) {
    const comment = await Comment.findOneOrFail(id, { loadRelationIds: true });
  }

  async unlike(id: number, user: User) {
    const comment = await Comment.findOneOrFail(id, { loadRelationIds: true });
  }
}
