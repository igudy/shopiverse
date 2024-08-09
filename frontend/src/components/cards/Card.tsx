import React from "react";

interface ICardPayment {
  children: React.ReactNode;
}

export const CardPayment = ({ children }: ICardPayment) => {
  return <div className="p-3 shadow-xl">{children}</div>;
};
