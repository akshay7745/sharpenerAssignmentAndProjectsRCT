const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
// const db = require("./util/database");

const app = express();
const sequelize = require("./util/database");

const User = require("./models/user");
const Product = require("./models/product");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });

User.hasMany(Product);

User.hasOne(Cart);
Cart.belongsTo(User);

Cart.belongsToMany(Product, {
  through: CartItem,
});
Product.belongsToMany(Cart, {
  through: CartItem,
});

sequelize
  .sync({ force: false })
  .then((result) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Akshay", email: "akshay@gmail.com" });
    }

    return user;
  })
  .then((user) => {
    user.getCart().then((cart) => {
      if (!cart) {
        return user.createCart();
      }
      return cart;
    });
  })
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is up and running on server port number 3000");
    });
  })
  .catch((err) => console.log(err));
