import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Landing from "./Components/landing";
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

    isValid();
  };

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
    console.log("Signed out");
    setName("");
    setEmail("");
    setKey("");
    setLoggedIn(false);
    setShowMenu(false);
  };

  const toggleMenu = () => {
    console.log(showMenu);

    setShowMenu(!showMenu);
  };

  console.log("Logged in: ", loggedIn);
  let routes = (
    <>
      {" "}
      <Route
        exact
        path="/"
        render={(props) => <Landing closeMenu={closeMenu} />}
      />
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
      <Route
        exact
        path="/login"
        render={(props) => <Login action={changeKey} />}
      />
      <Route exact path="/signup" render={(props) => <Signup />} />
      <Route
        exact
        path="/account/edit"
        render={(props) => (
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
        render={(props) => (
          <Cart userKey={key} loggedIn={loggedIn} closeMenu={closeMenu} />
        )}
      />
      <Route
        exact
        path="/orders"
        render={(props) => (
          <Orders userKey={key} loggedIn={loggedIn} closeMenu={closeMenu} />
        )}
      />{" "}
    </>
  );

  return (
    <Router>
      <nav>
        {loggedIn && (
          <>
            <div>
              <Link to="/" className="navLink">
                Home
              </Link>
            </div>
            <section>
              <div className="toggleNav navLink" onClick={() => toggleMenu()}>
                {name}
              </div>
            </section>
            <div id="navMenu" className={showMenu ? "" : "collapsed"}>
              <Link to="/account/edit">Edit Account</Link>
              <Link to="/orders">Your Orders</Link>
              <Link to="/cart">Cart</Link>
              <div onClick={() => signout()} className="signoutText">
                Sign Out
              </div>
            </div>
          </>
        )}
        {!loggedIn && (
          <>
            <div>
              <Link to="/" className="navLink">
                Home
              </Link>
            </div>
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
