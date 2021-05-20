import { Comment } from "@src/database/entities/comment.entity";
import { User } from "@src/database/entities/user.entity";
import { IComment } from "@src/interfases/comment.interface";
import { injectable } from "inversify";

@injectable()
export class CommentRepository {
  async create(
    commentDto: IComment,
    { postId, userId, parentId }: { postId?: number; userId: number; parentId?: number },
  ) {
    const { body, path } = commentDto;
    const comment = new Comment({ body, path });
    comment.user = <any>{ id: userId };
    if (postId) comment.post = <any>{ id: postId };
    if (parentId) comment.parents = [<any>{ id: parentId }];
    await comment.save();
  }

  async update(commentDto: IComment) {
    const { id, body, path } = commentDto;
    await Comment.update({ id }, { body, path });
  }

  async findOne(id: number, relations?: string[]) {
    return await Comment.findOne(id, { relations });
  }

  async like(id: number, user: User) {
    const comment = await Comment.findOneOrFail(id, { loadRelationIds: true });
  }

  async unlike(id: number, user: User) {
    const comment = await Comment.findOneOrFail(id, { loadRelationIds: true });
  }

  async delete(id: number, userId: number) {
    const comment = await Comment.findOneOrFail(id, {
      where: { user: { id: userId } },
      relations: ["children", "likedUsers", "unLikedUsers"],
    });

    await Promise.allSettled([
      Comment.remove(comment.children),
      User.remove([...comment.likedUsers, ...comment.unLikedUsers]),
      Comment.delete({ id, user: { id: userId } }),
    ]);
  }
}
