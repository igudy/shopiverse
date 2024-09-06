export interface IReviewProduct {
  message: string;
}

export interface IDeleteReview {
  message: string;
}

export interface IReviewProductReq {
  id: string;
  star: number;
  review: string;
  reviewDate: string;
}
