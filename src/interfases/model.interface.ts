/**
 * 개체의 필수 요소 (모델)
 * @property {id} 식별자
 * @property {createdAt} 개체 생성 일자
 * @property {updatedAt} 개체 수정 일자
 */
export interface IModel {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
