import { IModel } from "./model.interface";

/**
 * 댓글
 * @property {count} 2초 안에 댓글 단 횟수
 */
export interface ICommentCounter extends IModel {
  count: number;
}
