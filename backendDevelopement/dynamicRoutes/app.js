const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const sequelize = require("./util/database");
const User = require("./models/user");
const Product = require("./models/product");
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

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

Product.belongsToMany(Cart, { through: CartItem });
sequelize
  // .sync({ force: true })
  .sync()
  .then((result) => {
    return User.findByPk(1);

    // console.log("Created table or retrieved");
    // app.listen(4000, () => {
    //   console.log(`App is running on port number ${4000}`);
    // });
  })
  .then((user) => {
    if (!user) {
      return User.create({
        name: "akshay",
        email: "akshay@gmail.com",
        phonenumber: 12346789,
      });
    } else {
      return user;
    }
  })
  .then((user) => {
    return user.createCart();
  })
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
