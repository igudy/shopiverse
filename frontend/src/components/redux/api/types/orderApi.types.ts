import { ReactNode } from "react";
import { string } from "zod";

export interface IGetOrder {
  _id: String;
  user: String;
  product: {
    _id: String;
    name: String;
    productImg: String;
    quantity: Number;
    price: Number;
    falsePrice: Number;
    category: String;
    brand: String;
    desc: String;
    createdAt: String;
    updatedAt: String;
    __v: Number;
    sold: Number;
    ratings: {
      star: String;
      review: String;
      reviewDate: String;
      name: String;
      userID: String;
    }[];
  };
  orderDate: String;
  orderTime: String;
  orderAmount: any;
  orderStatus: String;
  paymentMethod: String;
  cartItems: {
    _id: String;
    name: String;
    productImg: String;
    quantity: Number;
    price: Number;
    falsePrice: Number;
    category: String;
    brand: String;
    desc: String;
    cartQuantity: Number;
  }[];
  shippingAddress: {
    street: String;
    city: String;
  };
  coupon: {
    name: String;
  };
  createdAt: String;
  updatedAt: String;
  __v: Number;
}

export interface IGetOrders {
  _id: String;
  user: String;
  product: {
    _id: String;
    name: String;
    productImg: String;
    quantity: Number;
    price: Number;
    falsePrice: Number;
    category: String;
    brand: String;
    desc: String;
    createdAt: String;
    updatedAt: String;
    __v: Number;
    sold: Number;
    ratings: {
      star: String;
      review: String;
      reviewDate: String;
      name: String;
      userID: String;
    }[];
  };
  orderDate: String;
  orderTime: String;
  orderAmount: any;
  orderStatus: String;
  paymentMethod: String;
  cartItems: {
    _id: String;
    name: String;
    productImg: String;
    quantity: Number;
    price: Number;
    falsePrice: Number;
    category: String;
    brand: String;
    desc: String;
    cartQuantity: Number;
  }[];
  shippingAddress: {
    street: String;
    city: String;
  };
  coupon: {
    name: String;
  };
  createdAt: String;
  updatedAt: String;
  __v: Number;
}
[];

export interface ICreateOrder {
  message: string;
}

export interface IUpdateOrder {
  //   message?: string;
}
