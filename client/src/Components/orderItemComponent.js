import React, { useState } from "react";


const OrderItem = ({ orderItem }) => {
  const formatDate = (date) => {
    return (
      date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear()
    );
  };

  return (
    <tr className="orderRow">
      <td>{orderItem.name}</td>
      <td>{orderItem.quantity}</td>
      <td>{formatDate(new Date(orderItem.date))}</td>
    </tr>
  );
};

export default OrderItem;
