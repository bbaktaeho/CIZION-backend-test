import { Comment } from "@src/database/entities/comment.entity";
import { IComment } from "@src/interfases/comment.interface";
import { CommentRepository } from "@src/repositories/comment.repository";
import { injectable } from "inversify";

@injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

  async createComment(commentDto: IComment) {}
  async createReComment(commentDto: IComment, parentId: number) {}
  async likeComment(commentDto: IComment) {}
  async unlikeComment(commentDto: IComment) {}
  async updateComment(commentDto: IComment) {}
  async deleteComment(commentDto: IComment) {}
}
