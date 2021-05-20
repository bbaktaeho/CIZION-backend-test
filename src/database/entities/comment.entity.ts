import { IComment } from "@src/interfases/comment.interface";
import { Entity, Column, ManyToOne, ManyToMany, JoinTable, JoinColumn } from "typeorm";
import { Model } from "./model.entity";
import { Post } from "./post.entity";
import { User } from "./user.entity";

@Entity()
export class Comment extends Model implements IComment {
  @Column()
  body: string;

  @Column({ nullable: true })
  path: string;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToOne(() => Post, { onDelete: "CASCADE" })
  @JoinColumn({ name: "postId" })
  post: Post;

  @ManyToMany(() => Comment, comment => comment.parents, { onDelete: "CASCADE" })
  @JoinTable({
    name: "parent_child_comment",
    joinColumns: [{ name: "parentCommentId" }],
    inverseJoinColumns: [{ name: "childCommentId" }],
  })
  children: Comment[];

  @ManyToMany(() => Comment, comment => comment.children)
  @JoinTable({
    name: "parent_child_comment",
    joinColumns: [{ name: "childCommentId" }],
    inverseJoinColumns: [{ name: "parentCommentId" }],
  })
  parents: Comment[];

  @ManyToMany(() => User, user => user.likedComments, { onDelete: "CASCADE" })
  likedUsers: User[];

  @ManyToMany(() => User, user => user.unLikedComments, { onDelete: "CASCADE" })
  unLikedUsers: User[];
}
