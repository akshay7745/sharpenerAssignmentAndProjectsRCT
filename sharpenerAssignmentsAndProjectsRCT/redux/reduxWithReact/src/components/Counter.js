import classes from "./Counter.module.css";
import { useSelector, useDispatch } from "react-redux";
import { counterActions } from "../store/counterSlice";
const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector((store) => store.counter.counter1);

  const show = useSelector((store) => store.counter.showCounter);
  const incrementHandler = () => {
    dispatch(counterActions.increment());
  };
  const increaseDynamicallyHandler = () => {
    dispatch(counterActions.increase(2));
  };
  const decrementHandler = () => {
    dispatch(counterActions.decrement());
  };

  const toggleCounterHandler = () => {
    dispatch(counterActions.toggleCounter());
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>Increase By 5</button>
        <button onClick={increaseDynamicallyHandler}>Increase By 2</button>
        <button onClick={decrementHandler}>Decrease By 5</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
