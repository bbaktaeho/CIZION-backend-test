import { IModel } from "./model.interface";

/**
 * 댓글
 * @property {body} 댓글 내용
 * @property {path} 이미지 uri
 */
export interface IComment extends IModel {
  body: string;
  path?: string;
}
