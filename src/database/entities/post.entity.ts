import { Entity, Column, ManyToOne, OneToMany } from "typeorm";
import { IPost } from "../../common/interfases/post.interface";
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
  user?: User;

  @OneToMany(() => Comment, comment => comment.post)
  comments?: Comment[];
}