export interface IGetBrand {
  _id?: string;
  slug?: string;
  category?: string;
}

export type IGetBrands = IGetBrand[];

export interface IPostBrand {
  _id?: string;
  slug?: string;
  category?: string;
  name?: string;
}

export interface IDeleteBrand {
  message?: string;
}
