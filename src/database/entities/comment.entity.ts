import { Entity, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { IComment } from "../../common/interfases/comment.interface";
import { Model } from "./model.entity";
import { Post } from "./post.entity";
import { User } from "./user.entity";

@Entity()
export class Comment extends Model implements IComment {
  @Column()
  body: string;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  user: User;

  @ManyToOne(() => Post, { onDelete: "CASCADE" })
  post: Post;

  @ManyToMany(() => Comment)
  @JoinTable({
    name: "parent_child_comment",
    joinColumns: [{ name: "parentCommentId" }],
    inverseJoinColumns: [{ name: "childCommentId" }],
  })
  children?: Comment[];

  @ManyToMany(() => Comment, comment => comment.children)
  parents?: Comment[];

  @ManyToMany(() => User, user => user.likedComments)
  likedUsers: User[];
}
