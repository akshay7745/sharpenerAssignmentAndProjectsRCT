import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";
const Cart = (props) => {
  const cartItems = useSelector((store) => store.cart.cartItems);
  console.log(cartItems, "from the cart component...");
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartItems.map((item) => {
          const { title, quantity, price, id } = item;
          return (
            <CartItem
              key={id}
              item={{
                title,
                quantity: +quantity,
                total: +quantity * +price,
                price: +price,
                id,
              }}
            />
          );
        })}
      </ul>
    </Card>
  );
};

export default Cart;
