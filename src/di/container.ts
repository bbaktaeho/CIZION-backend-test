import { Container } from "inversify";
import { AuthService } from "../app/auth-module/auth.service";
import { CommentService } from "../app/comment-module/comment.service";
import { PostService } from "../app/post-module/post.service";
import { UserService } from "../app/user-module/user.service";
import { CommentRepository } from "../repositories/comment.repository";
import { PostRepository } from "../repositories/post.repository";
import { UserRepository } from "../repositories/user.repository";

// IoC
export const container = new Container({
  defaultScope: "Singleton",
});

// service injection
container.bind(AuthService).toSelf();
container.bind(UserService).toSelf();
container.bind(PostService).toSelf();
container.bind(CommentService).toSelf();

// repository injection
container.bind(UserRepository).toSelf();
container.bind(PostRepository).toSelf();
container.bind(CommentRepository).toSelf();
