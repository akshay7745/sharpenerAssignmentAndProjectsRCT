import classes from "./MealsForm.module.css";

const MealsForm = () => {
  return (
    <form className={classes.form}>
      <div>
        <div>
          <label htmlFor="amount">Amount</label>
          <input type="number" id="amount" value={1} readOnly />
        </div>
      </div>
      <div>
        <button type="submit">+Add</button>
      </div>
    </form>
  );
};

export default MealsForm;
