import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";

const Product = ({ itemID, loggedIn, userKey }) => {
  const [ID] = useState(itemID);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [protection, setProtection] = useState(0);
  const [rating, setRating] = useState(0);
  const [weight, setWeight] = useState(0);
  const [imgSrc, setImgSrc] = useState("");
  const [redirect, setRedirect] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3001/item/${ID}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setName(data.name);
        setPrice(data.price);
        setProtection(data.protection);
        setRating(data.rating);
        setWeight(data.weight);
        setImgSrc(data.imgSrc);
        console.log(data);
      });
  }, []);

  const backToHome = () => {
    setRedirect("/");
  };

  const addToCart = () => {
    if (!loggedIn) {
      setRedirect("/login");
    } else {
      fetch(`http://localhost:3001/cart?key=${userKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemID: ID }),
      }).then((res) => {
        setShowPrompt(true);
        setTimeout(() => {
          setShowPrompt(false);
        }, 1100);
      });
    }
  };

  const routeToCart = () => {
    if (loggedIn) {
      setRedirect("/cart");
    } else {
      setRedirect("/login");
    }
  };

  if (redirect) {
    return <Redirect to={redirect} />;
  }
  return (
    <section className="mainSection">
      <div id="itemAddedPrompt" className={showPrompt ? "" : "disabled"}>
        Item Added to Cart
      </div>
      <section className="product">
        <div className="tableContainer">
          <div className="itemName">
            {name}
          </div>
          <table className="table">
            <tbody>
              <tr className="table-row">
                <td>Weight</td>
                <td>{weight} oz</td>
              </tr>
              <tr className="table-row">
                <td>Protection</td>
                <td>{protection}%</td>
              </tr>
              <tr className="table-row">
                <td>Rating</td>
                <td>{rating}</td>
              </tr>
              <tr className="table-row">
                <td>Price</td>
                <td>${price}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <img src={"/" + imgSrc} className="productImage"/>
        <div className="returnBtnDiv">
          <div onClick={backToHome} className="returnBtn">Go Back</div>
        </div>
        <div className="addToCartDiv">
          <div className="goBtn" onClick={() => routeToCart()}>
            Go to Cart
          </div>
          <div onClick={addToCart} className="addBtn">Add to Cart</div>
        </div>
      </section>
      <img className="orange-bg" src="/orange_background.png" alt="Orange Background" />
    </section>
  );
};

export default Product;
