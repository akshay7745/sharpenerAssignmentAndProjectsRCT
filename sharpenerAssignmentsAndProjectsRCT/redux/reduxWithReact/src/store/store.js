import { createStore } from "redux";

const counterReducer = (state = { counter: 0 }, action) => {
  if (action.type === "increment") {
    return {
      counter: state.counter + 5,
    };
  } else if (action.type === "decrement") {
    return {
      counter: state.counter - 5,
    };
  } else {
    return state;
  }
};
const store = createStore(counterReducer);

export default store;
