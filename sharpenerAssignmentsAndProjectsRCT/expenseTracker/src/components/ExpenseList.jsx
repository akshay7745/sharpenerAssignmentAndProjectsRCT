import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AddExpense from "./AddExpense";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import axios from "axios";
const ExpenseList = () => {
  const [expenseData, setExpenseData] = useState([]);
  const handleExpenses = (data) => {
    setExpenseData((prevState) => {
      return [...prevState, data];
    });
  };
  const getExpenses = async () => {
    try {
      const res = await axios(
        "https://onlinestore-594cd-default-rtdb.firebaseio.com/expenses.json"
      );
      console.log("from expense list refresh");
      setExpenseData(Object.values(res.data));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getExpenses();
  }, []);
  console.log(expenseData);
  return (
    <>
      <AddExpense handleExpenses={handleExpenses} />
      <Row>
        <Col>
          <h3 className="display-4 text-center">Daily Expenses</h3>
        </Col>
      </Row>

      {expenseData.map((expense) => {
        const { description, amount, category, id } = expense;
        return (
          <Row key={id} className="justify-content-center  mb-3 ">
            <Col md={2}>
              <Stack style={{ width: "650px" }} direction="horizontal" gap={2}>
                <span>{description}</span>
                <span>{amount}</span>
                <span>{category}</span>
                <Button type="button">Delete</Button>
              </Stack>
            </Col>
          </Row>
        );
      })}
    </>
  );
};

export default ExpenseList;
