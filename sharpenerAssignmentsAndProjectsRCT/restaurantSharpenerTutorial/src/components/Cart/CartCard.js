import classes from "./CartCard.module.css";
const CartCard = () => {
  return (
    <>
      <div className={classes.cartCard}>
        <div>
          <span>Total Amount</span>
          <span>35.62</span>
        </div>
        <div>
          <button>Close</button>
          <button>Order</button>
        </div>
      </div>
      <div className={classes.cartCardBase}></div>
    </>
  );
};

export default CartCard;
