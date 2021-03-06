import { CommentController } from "@src/app/modules/comment-module/comment.controller";
import { IUser } from "@src/interfases/user.interface";
import { Entity, Column, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Comment } from "./comment.entity";
import { Model } from "./model.entity";
import { Post } from "./post.entity";

@Entity()
export class User extends Model implements IUser {
  @Column()
  email: string;

  @Column()
  nickname: string;

  @Column()
  password: string;

  @OneToMany(() => Post, post => post.user)
  posts: Post[];

  @OneToMany(() => Comment, comment => comment.user)
  comments: Comment[];

  @ManyToMany(() => Comment, comment => comment.likedUsers)
  @JoinTable({
    name: "user_comment_like",
  })
  likedComments: Comment[];

  @ManyToMany(() => Comment, comment => comment.unLikedUsers)
  @JoinTable({
    name: "user_comment_unlike",
  })
  unLikedComments: Comment[];
}
