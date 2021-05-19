import { IModel } from "./model.interface";

export interface IPost extends IModel {
  title: string;
  body: string;
}
