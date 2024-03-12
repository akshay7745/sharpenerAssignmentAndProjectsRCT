import { useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
const AddExpense = ({ handleExpenses }) => {
  const [expenseData, setExpenseData] = useState({
    amount: "",
    description: "",
    category: "Select Category",
  });
  const { amount, description, category } = expenseData;
  const onChangeHandler = (e) => {
    setExpenseData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(expenseData);
    handleExpenses(expenseData);
  };
  return (
    <>
      <Row className="mt-5 justify-content-center">
        <Col md={9}>
          <Form className="shadow p-5 rounded-2 " onSubmit={submitHandler}>
            <InputGroup className="mb-3">
              <InputGroup.Text>Expense Description and Amount</InputGroup.Text>
              <Form.Control
                placeholder="Enter Description"
                aria-label="Expense Description"
                onChange={onChangeHandler}
                value={description}
                name="description"
              />
              <Form.Control
                placeholder="Enter Amount"
                aria-label="Expense Amount"
                type="number"
                onChange={onChangeHandler}
                value={amount}
                name="amount"
              />
            </InputGroup>
            <InputGroup>
              <Form.Select
                value={category}
                onChange={onChangeHandler}
                aria-label="expense category"
                name="category"
              >
                <option>Select Category</option>
                <option value="food">Food</option>
                <option value="fuel">Fuel</option>
                <option value="salary">Salary</option>
              </Form.Select>
              <Button className="px-5" type="submit">
                Add Expense
              </Button>
            </InputGroup>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default AddExpense;
