import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Landing from "./Components/landing";
import ProductsPage from "./Components/productsPage";
import Product from "./Components/product";
import Login from "./Components/login";
import Signup from "./Components/signup";
import EditAccount from "./Components/editAccount";
import Cart from "./Components/cart";
import Orders from "./Components/orders";

const App = () => {
  const [key, setKey] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const changeKey = (key, name, email) => {
    setKey(key);
    setName(name);
    setEmail(email);
  };

  useEffect(() => {
    isValid();
  }, [key]);

  // useEffect(() => {
  //   console.log(key);
  // }, [key]);

  const updateUser = (name, email) => {
    setName(name);
    setEmail(email);
  };

  const isValid = () => {
    fetch(`http://localhost:3001/validateKey?key=${key}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setLoggedIn(data);
      });
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  const signout = () => {
    setName("");
    setEmail("");
    setKey("");
    setLoggedIn(false);
    setShowMenu(false);
  };

  let routes = (
    <>
      {loggedIn ? (
        <Route
          exact
          path="/products"
          render={() => <ProductsPage closeMenu={closeMenu} />}
        />
      ) : (
        <Redirect to="/" />
      )}
      <Route exact path="/" render={() => <Landing closeMenu={closeMenu} />} />
      <Route
        path="/product/:id"
        render={(props) => (
          <Product
            itemID={props.match.params.id}
            loggedIn={loggedIn}
            userKey={key}
          />
        )}
      />
      <Route exact path="/login" render={() => <Login action={changeKey} />} />
      <Route exact path="/signup" render={(props) => <Signup />} />
      <Route
        exact
        path="/account/edit"
        render={() => (
          <EditAccount
            name={name}
            email={email}
            loggedIn={loggedIn}
            userKey={key}
            updateUser={updateUser}
            closeMenu={closeMenu}
          />
        )}
      />
      <Route
        exact
        path="/cart"
        render={() => (
          <Cart userKey={key} loggedIn={loggedIn} closeMenu={closeMenu} />
        )}
      />
      <Route
        exact
        path="/orders"
        render={() => (
          <Orders userKey={key} loggedIn={loggedIn} closeMenu={closeMenu} />
        )}
      />{" "}
    </>
  );
  return (
    <Router>
      <nav>
        <div>
          <Link to={loggedIn ? "/products" : "/"}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <img
                style={{ width: 45, marginLeft: 30 }}
                src="/mask_logo.png"
                alt="Get Masked Logo"
              />
              <div className="navTitle">GetMasked</div>
            </div>
          </Link>
        </div>
        {loggedIn && (
          <>
            <section>
              <div>
                <Link to="/account/edit" className="navLink">
                  Account
                </Link>
              </div>
              <div>
                <Link to="/orders" className="navLink">
                  Orders
                </Link>
              </div>
              <div>
                <Link to="/cart" className="navLink">
                  Cart
                </Link>
              </div>
              <div onClick={() => signout()} className="signoutText navLink">
                Sign Out
              </div>
            </section>
          </>
        )}
        {!loggedIn && (
          <>
            <section>
              <div>
                <Link to="/signup" className="navLink">
                  Sign Up
                </Link>
              </div>

              <div>
                <Link to="/login" className="navLink">
                  Log In
                </Link>
              </div>
            </section>
          </>
        )}
      </nav>
      {routes}
    </Router>
  );
};

export default App;
