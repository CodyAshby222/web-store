import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import OrderItem from "./orderItemComponent";

const Orders = ({ closeMenu, loggedIn, userKey }) => {
  const [orderList, setOrderList] = useState([]);
  const [redirect, setRedirect] = useState(null);

  useEffect(() => {
    // closeMenu();
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
      <img className="orange-bg" src="/orange_background.png" />
      <section id="orderContainer" className="tableContainer">
        <h1 className="pageTitleOrders">Orders</h1>
        <table className="ordersTable">
          <thead>
            <tr>
              <td>Name</td>
              <td>Quantity</td>
              <td>Date</td>
            </tr>
          </thead>
          <tbody>
            {orderList.map((orderItem) => (
              <OrderItem orderItem={orderItem} />
            ))}
          </tbody>
        </table>
        <div className="orange-btn btn-size">Go To Products</div>
      </section>
    </section>
  );
};

export default Orders;
