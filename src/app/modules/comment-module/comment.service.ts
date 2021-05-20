import { Exception } from "@src/common/exceptions/exception";
import { Comment } from "@src/database/entities/comment.entity";
import { IComment } from "@src/interfases/comment.interface";
import { CommentRepository } from "@src/repositories/comment.repository";
import { PostRepository } from "@src/repositories/post.repository";
import { UserRepository } from "@src/repositories/user.repository";
import { injectable } from "inversify";

@injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly postRepository: PostRepository,
  ) {}

  async createComment(commentDto: IComment, postId: number, userId: number): Promise<void> {
    const post = await this.postRepository.getPost(postId);
    if (!post) throw Exception.new(404, "없는 게시글");
    await this.commentRepository.create(commentDto, { postId, userId });
  }

  async createReComment(commentDto: IComment, parentId: number, userId: number): Promise<void> {
    const comment = await this.commentRepository.findOne(parentId);
    if (!comment) throw Exception.new(404, "없는 댓글");
    await this.commentRepository.create(commentDto, { userId, parentId });
  }

  async likeComment(commentDto: IComment) {}
  async unlikeComment(commentDto: IComment) {}

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
