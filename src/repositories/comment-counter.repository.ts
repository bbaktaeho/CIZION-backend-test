import { CommentCounter } from "@src/database/entities/comment-counter.entity";
import { injectable } from "inversify";

@injectable()
export class CommentCounterRepository {
  async findOneByPostId(userId: number, postId: number) {
    return await CommentCounter.findOne(undefined, {
      where: { post: { id: postId }, user: { id: userId } },
    });
  }

  async findOneByParentId(userId: number, parentId: number) {
    return await CommentCounter.findOne(undefined, {
      where: { comment: { id: parentId }, user: { id: userId } },
    });
  }

  async createFromPostId(userId: number, postId: number) {
    const commentCounter = new CommentCounter();
    commentCounter.count = 1;
    commentCounter.user = <any>{ id: userId };
    commentCounter.post = <any>{ id: postId };
    await commentCounter.save();
  }

  async createFromParentId(userId: number, parentId: number) {
    const commentCounter = new CommentCounter();
    commentCounter.count = 1;
    commentCounter.user = <any>{ id: userId };
    commentCounter.comment = <any>{ id: parentId };
    await commentCounter.save();
  }

  async update(id: number, count: number) {
    await CommentCounter.update({ id }, { count });
  }

  async delete() {}
}
