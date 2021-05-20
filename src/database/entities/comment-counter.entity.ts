import { ICommentCounter } from "@src/interfases/comment-counter.interface";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Model } from "./model.entity";
import { Post } from "./post.entity";
import { User } from "./user.entity";

@Entity()
export class CommentCounter extends Model implements ICommentCounter {
  @Column()
  count: number;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToOne(() => Post, { onDelete: "CASCADE" })
  @JoinColumn({ name: "postId" })
  post: Post;

  @ManyToOne(() => Comment, { onDelete: "CASCADE" })
  @JoinColumn({ name: "commentId" })
  comment: Comment;
}
