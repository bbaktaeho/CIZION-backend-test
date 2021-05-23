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

  private isSpammingTime(count: number, updatedAt: Date): boolean {
    const updateTime = parseInt((updatedAt.getTime() / 1000).toFixed(0));
    const currentTime = parseInt((Date.now() / 1000).toFixed(0));
    const gap = currentTime - updateTime;

    // 도배 횟수가 5 미만이면서 5초 안에 또 작성할 경우 true
    if (count < 5 && gap <= 5) return true;
    // 총 5번의 도배 횟수와 업데이트 시간이 아직 1분 이상으로 지나지 않았다면 throw
    if (count == 5 && gap < 60) throw Exception.new(403, "도배 금지");
    // 이도저도 아니면 false
    return false;
  }

  async createReComment(commentDto: IComment, parentId: number, userId: number): Promise<void> {
    const [parentComment, commentCounter] = await Promise.all([
      this.commentRepository.findOne(parentId),
      this.commentCounterRepository.findOneByParentId(userId, parentId),
    ]);
    if (!parentComment) throw Exception.new(404, "없는 댓글");

    if (!commentCounter) {
      await this.commentCounterRepository.createFromParentId(userId, parentId);
    } else {
      const { id, count, updatedAt } = commentCounter;
      const checkSpamming = this.isSpammingTime(count, updatedAt);
      if (checkSpamming) this.commentCounterRepository.update(id, count + 1);
      else await this.commentCounterRepository.update(id, 1);
    }
    await this.commentRepository.create(commentDto, { userId, parentId });
  }

  async createComment(commentDto: IComment, postId: number, userId: number): Promise<void> {
    const [post, commentCounter] = await Promise.all([
      this.postRepository.getPost(postId),
      this.commentCounterRepository.findOneByPostId(userId, postId),
    ]);
    if (!post) throw Exception.new(404, "없는 게시글");

    if (!commentCounter) {
      await this.commentCounterRepository.createFromPostId(userId, postId);
    } else {
      const { id, count, updatedAt } = commentCounter;
      const checkSpamming = this.isSpammingTime(count, updatedAt);
      if (checkSpamming) this.commentCounterRepository.update(id, count + 1);
      else await this.commentCounterRepository.update(id, 1);
    }
    await this.commentRepository.create(commentDto, { postId, userId });
  }

  async getComments(postId: number): Promise<IComment[]> {
    if (!postId) throw Exception.new(400, "query postId가 숫자가 아님");
    return await this.commentRepository.findAllByPostId(postId);
  }

  async getReComments(id: number): Promise<IComment[]> {
    return await this.commentRepository.findAllByParentId(id);
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
