import classes from "./MealItem.module.css";
import MealItemForm from "../MealItemForm";
const MealItem = (props) => {
  const { price, description, name, id } = props;
  const short_price = `$${price.toFixed(2)}`;
  return (
    <li className={classes.meal}>
      <div>
        <h3>{name}</h3>
        <div className={classes.description}>{description}</div>
        <div className={classes.price}>{short_price}</div>
      </div>
      <div>
        <MealItemForm
          itemData={{ id, price, name, description, quantity: 0 }}
        />
      </div>
    </li>
  );
};

export default MealItem;
