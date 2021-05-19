import { injectable } from "inversify";
import { IPost } from "../common/interfases/post.interface";
import { IUser } from "../common/interfases/user.interface";
import { Post } from "../database/entities/post.entity";

@injectable()
export class PostRepository {
  async createPost(postDto: IPost, user: IUser) {
    const { title, body } = postDto;
    const post = new Post({ title, body, user });
    await post.save();
  }

  async getPosts() {
    return await Post.find();
  }

  async getPost(id: number) {
    return await Post.findOne(id, { loadRelationIds: true });
  }

  async deletePost(id: number, userId: number) {
    return await Post.delete({ id, user: { id: userId } });
  }
}
