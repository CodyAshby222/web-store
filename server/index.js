const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

mongoose.set("useFindAndModify", false);
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);

let app = express();

app.use(cors());

// let tables = require("./models/model");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/WebStoreDB");

const routes = require("./routes/routes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let startup = require("./controllers/startup");
startup.initalizeItems();

//Defau;t
app.get("/", routes.root);

//Validate
app.get("/validateKey", routes.key__validate);

//Items
app.get("/items", routes.item__getList);
app.get("/item/:id", routes.item__getDetails);

//User
app.post("/user", routes.user__create);
app.put("/user", routes.verifyKey, routes.user__update);
app.delete("/user", routes.verifyKey, routes.user__delete);

//Sign in
app.post("/validate", routes.user__getKey);

//Cart
app.get("/cart", routes.verifyKey, routes.cart__getList);
app.post("/cart", routes.verifyKey, routes.cart__create);
app.put("/cart", routes.verifyKey, routes.cart__update);

//Orders
app.post("/checkout", routes.verifyKey, routes.order__create);
app.get("/orders", routes.verifyKey, routes.order__getList);

app.listen(3001);
