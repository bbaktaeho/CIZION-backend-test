import { IModel } from "./model.interface";

/**
 * 사용자
 * @property {email} 사용자 이메일
 * @property {nickname} 사용자 닉네임
 * @property {password} 사용자 비밀번호
 */
export interface IUser extends IModel {
  email: string;
  nickname: string;
  password: string;
}
