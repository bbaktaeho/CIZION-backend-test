import { AuthService } from "@src/app/modules/auth-module/auth.service";
import { CommentService } from "@src/app/modules/comment-module/comment.service";
import { PostService } from "@src/app/modules/post-module/post.service";
import { UserService } from "@src/app/modules/user-module/user.service";
import { CommentRepository } from "@src/repositories/comment.repository";
import { PostRepository } from "@src/repositories/post.repository";
import { UserRepository } from "@src/repositories/user.repository";
import { Container } from "inversify";

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
