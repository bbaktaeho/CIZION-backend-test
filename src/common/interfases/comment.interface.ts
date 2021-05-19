import { IModel } from "./model.interface";

/**
 * 댓글
 * @property {body} 댓글 내용
 */
export interface IComment extends IModel {
  body: string;
}
