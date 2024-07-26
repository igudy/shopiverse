export interface IGetCart {
  _id?: string;
  slug?: string;
  category?: string;
}

export type IGetCarts = IGetCart[];

export interface IPostCart {
  _id?: string;
  slug?: string;
  category?: string;
  name?: string;
}

export interface IDeleteCart {
  message?: string;
}
