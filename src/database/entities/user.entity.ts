import { Entity, Column, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { IUser } from "../../common/interfases/user.interface";
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
  posts?: Post[];

  @OneToMany(() => Comment, comment => comment.user)
  comments?: Comment[];

  @ManyToMany(() => Comment)
  @JoinTable({
    name: "user_comment_like",
  })
  likedComments?: Comment[];
}
