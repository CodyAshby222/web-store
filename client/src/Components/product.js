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
      <h1 className="pageTitle">{name}</h1>
      <div id="itemAddedPrompt" className={showPrompt ? "" : "disabled"}>
        Item Added to Cart
      </div>
      <section className="product">
        <div className="tableContainer">
          <table>
            <tbody>
              <tr>
                <td>Weight</td>
                <td>{weight} oz</td>
              </tr>
              <tr>
                <td>Protection</td>
                <td>{protection}%</td>
              </tr>
              <tr>
                <td>Rating</td>
                <td>{rating}</td>
              </tr>
              <tr>
                <td>Price</td>
                <td>${price}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <img src={"/" + imgSrc} />
        <div className="returnBtnDiv">
          <button onClick={backToHome}>Go Back</button>
        </div>
        <div className="addToCartDiv">
          <button onClick={addToCart}>Add to Cart</button>
          <p className="link" onClick={() => routeToCart()}>
            Go to Cart
          </p>
        </div>
      </section>
    </section>
  );
};

export default Product;
