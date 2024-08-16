export interface IGetOrder {
  _id: string;
  user: string;
  orderDate: string;
  orderTime: string;
  orderAmount: number;
  orderStatus: string;
  paymentMethod: string;
  cartItems: {
    _id: string;
    name: string;
    productImg: string;
    quantity: number;
    price: number;
    falsePrice: number;
    category: string;
    brand: string;
    desc: string;
    cartQuantity: number;
  }[];
  shippingAddress: {
    street: string;
    city: string;
  };
  coupon: {
    name: string | undefined | null;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IGetOrders {
  _id: string;
  user: string;
  orderDate: string;
  orderTime: string;
  orderAmount: number;
  orderStatus: string;
  paymentMethod: string;
  cartItems: {
    _id: string;
    name: string;
    productImg: string;
    quantity: number;
    price: number;
    falsePrice: number;
    category: string;
    brand: string;
    desc: string;
    cartQuantity: number;
  }[];
  shippingAddress: {
    street: string;
    city: string;
  };
  coupon: {
    name: string | undefined | null;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
}
[];

export interface ICreateOrder {
  message: string;
}

export interface IUpdateOrder {
  //   message?: string;
}
