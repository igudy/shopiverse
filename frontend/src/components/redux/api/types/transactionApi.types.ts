export interface IGetTransactions {
  _id: string;
  amount: number;
  sender: string;
  receiver: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
[];

export interface ITransferFund {
  message: string;
}

export interface IVerifyAccount {
  message: string;
  name: string;
}

export interface IDepositFundStripe {
  _id: string;
}
export interface IWebhook {
  _id: string;
}

export interface IDepositFundFLW {
  _id: string;
}
