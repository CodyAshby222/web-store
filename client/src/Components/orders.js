import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import OrderItem from "./orderItemComponent";

const Orders = ({ closeMenu, loggedIn, userKey }) => {
  const [orderList, setOrderList] = useState([]);
  const [redirect, setRedirect] = useState(null);

  useEffect(() => {
    closeMenu();
    if (!loggedIn) {
      setRedirect("/login");
    } else {
      fetch(`http://localhost:3001/orders?key=${userKey}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setOrderList(data);
          console.log(data);
        });
    }
  }, [closeMenu, loggedIn, userKey]);

  if (!loggedIn) {
    return <Redirect to="/" />;
  }
  if (redirect) {
    return <Redirect to={redirect} />;
  }
  return (
    <section className="mainSection">
      <h1 className="pageTitle">Orders</h1>
      <section id="orderContainer" className="tableContainer">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orderList.map((orderItem) => (
              <OrderItem orderItem={orderItem} />
            ))}
          </tbody>
        </table>
      </section>
    </section>
  );
};

export default Orders;
