import { injectable } from "inversify";
import { Exception } from "../../common/exceptions/exception";
import { IPost } from "../../common/interfases/post.interface";
import { CommentRepository } from "../../repositories/comment.repository";
import { PostRepository } from "../../repositories/post.repository";
import { UserRepository } from "../../repositories/user.repository";

@injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly userRepository: UserRepository,
    private readonly commentRepository: CommentRepository,
  ) {}

  async createPost(postDto: IPost, userId: number): Promise<void> {
    const user = await this.userRepository.getUserById(userId);
    if (!user) throw Exception.new(404, "없는 사용자");
    await this.postRepository.createPost(postDto, user);
  }

  async getPosts(): Promise<IPost[] | []> {
    return await this.postRepository.getPosts();
  }

  async getPost(id: number): Promise<IPost | undefined> {
    return await this.postRepository.getPost(id);
  }

  async deletePost(id: number, userId: number): Promise<void> {
    const result = await this.postRepository.deletePost(id, userId);
    if (result.affected === 0) throw Exception.new(403, "삭제 실패");
  }
}
