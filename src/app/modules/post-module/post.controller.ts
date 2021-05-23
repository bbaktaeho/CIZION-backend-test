import { controller, httpDelete, httpGet, httpPost } from "inversify-express-utils";
import { validatePost } from "./middlewares/post.validator";
import { PostService } from "./post.service";
import { Request, Response } from "express";
import { auth } from "@src/app/middlewares/auth/jwt.auth";

@controller("/posts")
export class PostController {
  constructor(private readonly postService: PostService) {}

  /**
   * 게시글 생성
   * @body {title: string, body: string}
   * @path POST /api/posts/
   */
  @httpPost("/", auth, validatePost)
  async createPost(req: Request, res: Response) {
    const userId = req.user!.id!;
    await this.postService.createPost(req.body, userId);
    res.status(201).end();
  }

  /**
   * 게시글 모두 조회
   * @path GET /api/posts/
   */
  @httpGet("/")
  async getPosts(req: Request, res: Response) {
    const posts = await this.postService.getPosts();
    res.status(200).json(posts);
  }

  /**
   * 게시글 조회
   * @path GET /api/posts/{id}
   */
  @httpGet("/:id")
  async getPost(req: Request, res: Response) {
    const id = +req.params.id;
    const post = await this.postService.getPost(id);
    res.status(200).json(post);
  }

  /**
   * 게시글 삭제
   * @path DELETE /api/posts/{id}
   */
  @httpDelete("/:id", auth)
  async deletePost(req: Request, res: Response) {
    const userId = req.user!.id!;
    const id = +req.params.id;
    await this.postService.deletePost(id, userId);
    res.status(200).end();
  }
}
