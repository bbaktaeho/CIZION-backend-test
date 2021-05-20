import { controller, httpDelete, httpPatch, httpPost, httpPut } from "inversify-express-utils";
import { Request, Response } from "express";
import { auth } from "@src/app/middlewares/auth/jwt.auth";
import { CommentService } from "./comment.service";
import { validateComment } from "./middlewares/comment.validator";
import { validateBandedWord } from "./middlewares/banded-word.validator";

@controller("/comments", auth)
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  /**
   * 댓글 생성
   * @body {comment: string, postId: number}
   * @path POST /api/comments/
   */
  @httpPost("/", validateComment, validateBandedWord)
  async createComment(req: Request, res: Response) {
    const { body, postId, path } = req.body;
    const userId = req.user!.id!;
    await this.commentService.createComment({ body, path }, postId, userId);
    res.status(201).end();
  }

  /**
   * 대댓글 생성
   * @body {comment: string}
   * @path POST /api/comments/{id}
   */
  @httpPost("/:id", validateComment, validateBandedWord)
  async createReComment(req: Request, res: Response) {
    const { body, path } = req.body;
    const parentId = +req.params.id;
    const userId = req.user!.id!;
    await this.commentService.createReComment({ body, path }, parentId, userId);
    res.status(201).end();
  }

  /**
   * 댓글 좋아요
   * @path PATCH /api/comments/{id}/like
   */
  @httpPatch("/:id/like")
  async likeComment(req: Request, res: Response) {
    const id = +req.params.id;
    const userId = req.user!.id!;
    await this.commentService.likeComment(id, userId);
    res.status(200).end();
  }

  /**
   * 댓글 싫어요
   * @path PATCH /api/comments/{id}/unlike
   */
  @httpPatch("/:id/unlike")
  async unlikeComment(req: Request, res: Response) {
    const id = +req.params.id;
    const userId = req.user!.id!;
    await this.commentService.unlikeComment(id, userId);
    res.status(200).end();
  }

  /**
   * 댓글 수정
   * @body {comment: string}
   * @path PUT /api/comments/{id}
   */
  @httpPut("/:id", validateComment, validateBandedWord)
  async updateComment(req: Request, res: Response) {
    const { body, path } = req.body;
    const id = +req.params.id;
    const userId = req.user!.id!;
    await this.commentService.updateComment({ id, body, path }, userId);
    res.status(200).end();
  }

  /**
   * 댓글 삭제
   * @path DELETE /api/comments/{id}
   */
  @httpDelete("/:id")
  async deleteComment(req: Request, res: Response) {
    const userId = req.user!.id!;
    const id = +req.params.id;
    await this.commentService.deleteComment(id, userId);
    res.status(200).end();
  }
}
