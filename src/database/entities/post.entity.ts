import { IPost } from "@src/interfases/post.interface";
import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Comment } from "./comment.entity";
import { Model } from "./model.entity";
import { User } from "./user.entity";

@Entity()
export class Post extends Model implements IPost {
  @Column()
  title: string;

  @Column()
  body: string;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user: User;

  @OneToMany(() => Comment, comment => comment.post)
  comments: Comment[];
}
