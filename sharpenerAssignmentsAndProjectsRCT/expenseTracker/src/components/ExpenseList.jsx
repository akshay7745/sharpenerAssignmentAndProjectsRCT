import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AddExpense from "./AddExpense";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
const ExpenseList = () => {
  const [expenseData, setExpenseData] = useState([]);
  const handleExpenses = (data) => {
    setExpenseData((prevState) => {
      return [...prevState, data];
    });
  };
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
        const { description, amount, category } = expense;
        return (
          <Row key={Math.random()} className="justify-content-center  mb-3 ">
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
