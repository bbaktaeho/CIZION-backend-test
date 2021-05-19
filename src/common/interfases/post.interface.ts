import { IModel } from "./model.interface";

/**
 * 게시글
 * @property {title} 게시글 제목
 * @property {body} 게시글 내용
 */
export interface IPost extends IModel {
  title: string;
  body: string;
}
