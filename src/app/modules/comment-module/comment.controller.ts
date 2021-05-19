import { controller, httpDelete, httpPatch, httpPost, httpPut } from "inversify-express-utils";
import { auth } from "../middlewares/auth/jwt.auth";
import { CommentService } from "./comment.service";
import { Request, Response } from "express";

@controller("/comments", auth)
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  /**
   * 댓글 생성
   * @body {comment: string}
   * @path POST /api/comments/
   */
  @httpPost("/")
  async createComment(req: Request, res: Response) {}

  /**
   * 대댓글 생성
   * @body {comment: string}
   * @path POST /api/comments/{id}
   */
  @httpPost("/:id")
  async createReComment(req: Request, res: Response) {}

  /**
   * 댓글 좋아요
   * @path PATCH /api/comments/{id}/like
   */
  @httpPatch("/:id/like")
  async likeComment(req: Request, res: Response) {}

  /**
   * 댓글 싫어요
   * @path PATCH /api/comments/{id}/unlike
   */
  @httpPatch("/:id/unlike")
  async unlikeComment(req: Request, res: Response) {}

  /**
   * 댓글 수정
   * @body {comment: string}
   * @path PUT /api/comments/{id}
   */
  @httpPut("/:id")
  async updateComment(req: Request, res: Response) {}

  /**
   * 댓글 삭제
   * @path DELETE /api/comments/{id}
   */
  @httpDelete("/:id")
  async deleteComment(req: Request, res: Response) {}
}
