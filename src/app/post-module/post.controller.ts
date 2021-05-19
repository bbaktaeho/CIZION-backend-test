import { controller, httpDelete, httpGet, httpPost } from "inversify-express-utils";
import { auth } from "../middlewares/auth/jwt.auth";
import { validatePost } from "./middlewares/post.validator";
import { PostService } from "./post.service";

@controller("/posts", auth)
export class PostController {
  constructor(private readonly postService: PostService) {}

  /**
   * 게시글 생성
   * @body {title: string, body: string}
   * @path POST /api/posts/
   */
  @httpPost("/", validatePost)
  async createPost() {}

  /**
   * 게시글 모두 조회
   * @path GET /api/posts/
   */
  @httpGet("/")
  async getPosts() {}

  /**
   * 게시글 조회
   * @path GET /api/posts/{id}
   */
  @httpGet("/:id")
  async getPost() {}

  /**
   * 게시글 삭제
   * @path DELETE /api/posts/{id}
   */
  @httpDelete("/:id")
  async deletePost() {}

  /**
   * 게시글의 댓글 모두 조회
   * @path GET /api/posts/{postId}/comments
   */
  @httpGet("/:id/comments")
  async getCommentsInPost() {}
}
