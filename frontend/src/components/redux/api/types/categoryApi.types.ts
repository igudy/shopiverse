export interface IGetCategory {
  _id: string;
  name: string;
  slug: string;
}
export type IGetCategories = IGetCategory[];

export interface IPostCategory {
  _id: string;
  name: string;
  slug: string;
}

export interface IDeleteCategory {
  message: string;
}
