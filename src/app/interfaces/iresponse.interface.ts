import { IuserType } from "./iuser-type.interface";

export interface IResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  results: IuserType[];
}
