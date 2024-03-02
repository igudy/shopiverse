export interface IGetCoupon {
  name: string;
  expiresAt: string;
  discount: number;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface IPostCoupon {
  name: string;
  expiresAt: string;
  discount: number;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface IDeleteCoupon {
  message: string;
}
