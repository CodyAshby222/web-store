import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import CartItem from "./cartItemComponent";

const Cart = ({ closeMenu, loggedIn, userKey }) => {
  const [cartList, setCartList] = useState([]);
  const [redirect, setRedirect] = useState(null);
  const [checkedOut, setCheckedOut] = useState(false);

  useEffect(() => {
    closeMenu();
    if (!loggedIn) {
      setRedirect("/login");
    } else {
      fetch(`http://localhost:3001/cart?key=${userKey}`)
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          setCartList(response);

          console.log(response);
        });
    }
  }, []);

  const totalPrice = () => {
    let total = 0;
    cartList.forEach((item) => {
      if (item.quantity > 0) total += item.quantity * item.price;
    });
    return Math.floor(total * 100) / 100;
  };

  const checkout = () => {
    fetch(`http://localhost:3001/cart?key=${userKey}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart: cartList }),
    }).then(() => {
      fetch(`http://localhost:3001/checkout?key=${userKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      }).then((response) => {
        setCartList([]);
        // checkedOut(true);
      });
    });
  };

  const changeItemQuantity = (itemID, newQuantity) => {
    const cartList = cartList.map((item) => {
      if (item.itemID == itemID) {
        item.quantity = newQuantity;
        console.log(item);
      }
      return item;
    });
    setRedirect(null);
    setCheckedOut(false);
    return { cartList };
  };

  useEffect(() => {
    fetch(`http://localhost:3001/cart?key=${userKey}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart: cartList }),
    });
  }, []);

  if (!loggedIn) {
    return <Redirect to="/" />;
  }
  if (redirect) {
    return <Redirect to={redirect} />;
  }
  return (
    <section className="mainSection">
      <h1 className="pageTitle">Cart</h1>
      <section className="cartContainer">
        <div className="container">
          <table className={checkedOut ? "hidden" : ""}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Unit Price</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {cartList.map((cartItem) => (
                <CartItem
                  cartItem={cartItem}
                  key={cartItem.itemID}
                  action={changeItemQuantity}
                />
              ))}
            </tbody>
          </table>
          <p className={checkedOut ? "" : "hidden"}>
            Your order has been placed!
          </p>
        </div>
        <div className="checkout">
          <p className={checkedOut ? "hidden" : ""}>
            {"Total: $" + totalPrice()}
          </p>
          <div className="buttonContainer">
            {" "}
            <button className={checkedOut ? "hidden" : ""} onClick={()=>checkout()}>
              Check Out
            </button>{" "}
          </div>
        </div>
      </section>
    </section>
  );
};

export default Cart;
