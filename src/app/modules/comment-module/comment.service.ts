import { Exception } from "@src/common/exceptions/exception";
import { IComment } from "@src/interfases/comment.interface";
import { CommentRepository } from "@src/repositories/comment.repository";
import { PostRepository } from "@src/repositories/post.repository";
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

  async getComments(postId: number): Promise<IComment[]> {
    if (!postId) throw Exception.new(400, "query postId가 숫자가 아님");
    return await this.commentRepository.findAll(postId);
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
