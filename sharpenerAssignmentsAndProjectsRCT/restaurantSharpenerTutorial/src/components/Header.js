import classes from "./Header.module.css";
import { ShoppingCart } from "react-feather";
// import { Feather } from "react-feather";
const Header = () => {
  return (
    <div className={classes.header_container}>
      <nav className={classes.nav_items_wrapper}>
        <div className={`${classes.nav_items} ${classes.logo}`}>ReactMeals</div>
        <div className={`${classes.cart} ${classes.nav_items}`}>
          <span className={classes.cart_icon}>
            {" "}
            <ShoppingCart />
          </span>
          <span>Your Cart</span> <span className={classes.quantity}>0</span>
        </div>
      </nav>
    </div>
  );
};

export default Header;
