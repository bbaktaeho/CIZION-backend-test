import { Post } from "@src/database/entities/post.entity";
import { IPost } from "@src/interfases/post.interface";
import { IUser } from "@src/interfases/user.interface";
import { injectable } from "inversify";


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
    return await Post.findOne(id, { relations: ["comments"] });
  }

  async deletePost(id: number, userId: number) {
    return await Post.delete({ id, user: { id: userId } });
  }
}
