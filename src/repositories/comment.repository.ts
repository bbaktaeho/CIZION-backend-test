import { Comment } from "@src/database/entities/comment.entity";
import { User } from "@src/database/entities/user.entity";
import { IComment } from "@src/interfases/comment.interface";
import { injectable } from "inversify";

/**
 * ! 좋아요와 싫어요의 퍼포먼스 문제가 있을 것 같다..
 */
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

  async findAll(postId: number) {
    return await Comment.find({ where: { post: { id: postId } }, loadRelationIds: true });
  }

  async like(id: number, userId: number) {
    const comment = await Comment.findOneOrFail(id, { relations: ["likedUsers", "unLikedUsers"] });
    if (comment.likedUsers.find(user => user.id === userId)) {
      comment.likedUsers = comment.likedUsers.filter(user => user.id !== userId);
    } else {
      comment.likedUsers.push(<any>{ id: userId });
      comment.unLikedUsers = comment.unLikedUsers.filter(user => user.id !== userId);
    }
    await comment.save();
  }

  async unlike(id: number, userId: number) {
    const comment = await Comment.findOneOrFail(id, { relations: ["likedUsers", "unLikedUsers"] });
    if (comment.unLikedUsers.find(user => user.id === userId)) {
      comment.unLikedUsers = comment.unLikedUsers.filter(user => user.id !== userId);
    } else {
      comment.unLikedUsers.push(<any>{ id: userId });
      comment.likedUsers = comment.likedUsers.filter(user => user.id !== userId);
    }
    await comment.save();
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
