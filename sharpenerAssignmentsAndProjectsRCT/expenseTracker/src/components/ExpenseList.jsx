import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AddExpense from "./AddExpense";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { restoreExpense, resetExpense } from "../contexts/expenseSlice";
const ExpenseList = () => {
  const expenses = useSelector((store) => store.expense.expenses);
  const dispatch = useDispatch();
  const [expenseItem, setExpenseItem] = useState({
    amount: "",
    description: "",
    category: "Select Category",
  });
  const [isEdited, setIsEdited] = useState(false);
  const handleEdit = (data) => {
    const { amount, description, category, id } = data;
    setIsEdited(id);
    setExpenseItem({ amount, description, category });
  };

  const getExpenses = async () => {
    try {
      const res = await axios(
        "https://onlinestore-594cd-default-rtdb.firebaseio.com/expenses.json"
      );
      if (res.data) {
        const allId = Object.keys(res.data);
        const allExpenses = Object.values(res.data).map((item, index) => {
          return { ...item, id: allId[index] };
        });
        setIsEdited(null);
        dispatch(restoreExpense(allExpenses));
      } else {
        dispatch(resetExpense());
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `https://onlinestore-594cd-default-rtdb.firebaseio.com/expenses/${id}.json`
      );
      if (res.statusText === "OK") {
        getExpenses();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getExpenses();
  }, []);
  return (
    <>
      <AddExpense
        expenseItem={expenseItem}
        setExpenseItem={setExpenseItem}
        isEdited={isEdited}
        getExpenses={getExpenses}
      />
      <Row>
        <Col>
          <h3 className="display-4 text-center">Daily Expenses</h3>
        </Col>
      </Row>

      {expenses.map((expense) => {
        const { description, amount, category, id } = expense;
        return amount < 10000 ? (
          <Row key={id} className="justify-content-center  mb-3 ">
            <Col md={2}>
              <Stack style={{ width: "650px" }} direction="horizontal" gap={2}>
                <span>{description}</span>
                <span>{amount}</span>
                <span>{category}</span>
                <Button
                  variant="success"
                  type="button"
                  onClick={() => {
                    handleEdit(expense);
                  }}
                >
                  Edit
                </Button>
                <Button
                  onClick={() => {
                    handleDelete(id);
                    getExpenses();
                  }}
                  variant="danger"
                  type="button"
                >
                  Delete
                </Button>
              </Stack>
            </Col>
          </Row>
        ) : (
          <Row key={id} className="justify-content-center  mb-3 ">
            <Col md={2}>
              <Stack style={{ width: "650px" }} direction="horizontal" gap={2}>
                <span>{description}</span>
                <span>{amount}</span>
                <span>{category}</span>
                <Button
                  variant="success"
                  type="button"
                  onClick={() => {
                    handleEdit(expense);
                  }}
                >
                  Edit
                </Button>
                <Button
                  onClick={() => {
                    handleDelete(id);
                    getExpenses();
                  }}
                  variant="danger"
                  type="button"
                >
                  Delete
                </Button>
                <Button type="button" variant="warning">
                  Activate Premium
                </Button>
              </Stack>
            </Col>
          </Row>
        );
      })}
    </>
  );
};

export default ExpenseList;
