import { Exception } from "@src/common/exceptions/exception";
import { IComment } from "@src/interfases/comment.interface";
import { CommentCounterRepository } from "@src/repositories/comment-counter.repository";
import { CommentRepository } from "@src/repositories/comment.repository";
import { PostRepository } from "@src/repositories/post.repository";
import { injectable } from "inversify";

@injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly postRepository: PostRepository,
    private readonly commentCounterRepository: CommentCounterRepository,
  ) {}

  private async checkSpamming() {}

  async createComment(commentDto: IComment, postId: number, userId: number): Promise<void> {
    const [post, commentCounter] = await Promise.all([
      this.postRepository.getPost(postId),
      this.commentCounterRepository.findOneByPostId(userId, postId),
    ]);

    if (!post) throw Exception.new(404, "없는 게시글");
    console.log(commentCounter);

    if (!commentCounter) {
      await Promise.allSettled([
        this.commentCounterRepository.createFromPostId(userId, postId),
        this.commentRepository.create(commentDto, { postId, userId }),
      ]);
    } else {
      // todo: if 업데이트 시간 가져와서 아직 1분 이상으로 지나지 않았다면 throw
      const count = commentCounter.count;
      // todo: gap 수정
      const gap = Date.now() - parseInt((commentCounter.updatedAt.getTime() / 1000).toFixed(0));
      console.log(parseInt(commentCounter.updatedAt.getTime().toFixed(0)));
      console.log(gap);

      if (count >= 5 && gap < 60000) throw Exception.new(403, "도배 금지");
      // todo: if 업데이트 시간이 2초 안팍이라면 count++
      if (gap < 2000) this.commentCounterRepository.update(commentCounter.id, count + 1);
      // todo: 이도저도 아니라면
      else await this.commentCounterRepository.update(commentCounter.id, 1);
    }
  }

  async getComments(postId: number): Promise<IComment[]> {
    if (!postId) throw Exception.new(400, "query postId가 숫자가 아님");
    return await this.commentRepository.findAllByPostId(postId);
  }

  async getReComments(id: number): Promise<IComment[]> {
    return await this.commentRepository.findAllByParentId(id);
  }

  async createReComment(commentDto: IComment, parentId: number, userId: number): Promise<void> {
    const comment = await this.commentRepository.findOne(parentId);
    if (!comment) throw Exception.new(404, "없는 댓글");
    await this.commentRepository.create(commentDto, { userId, parentId });
  }

  async likeComment(id: number, userId: number): Promise<void> {
    const comment = await this.commentRepository.findOne(id);
    if (!comment) throw Exception.new(404, "없는 댓글");
    await this.commentRepository.like(id, userId);
  }

  async unlikeComment(id: number, userId: number): Promise<void> {
    const comment = await this.commentRepository.findOne(id);
    if (!comment) throw Exception.new(404, "없는 댓글");
    await this.commentRepository.unlike(id, userId);
  }

  async updateComment(commentDto: IComment, userId: number): Promise<void> {
    const comment = await this.commentRepository.findOne(commentDto.id!, ["user"]);
    if (!comment) throw Exception.new(404, "없는 댓글");
    if (comment.user.id !== userId) throw Exception.new(403, "접근 금지");
    await this.commentRepository.update(commentDto);
  }

  async deleteComment(id: number, userId: number): Promise<void> {
    await this.commentRepository.delete(id, userId);
  }
}
