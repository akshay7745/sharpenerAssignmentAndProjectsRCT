import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import Table from "react-bootstrap/Table";
import AddExpense from "./AddExpense";
// import Button from "react-bootstrap/Button";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  restoreExpense,
  resetExpense,
  deleteExpense,
} from "../contexts/expenseSlice";
import ExpenseTable from "./ExpenseTable";
const ExpenseList = () => {
  const expenses = useSelector((store) => store.expense.expenses);
  let emailId = useSelector((store) => store.authentication.email);
  emailId = emailId.slice(0, emailId.length - 10);
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
        `${import.meta.env.VITE_PRODUCT_BASE_URL}${emailId}.json`
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
        `${import.meta.env.VITE_PRODUCT_BASE_URL}${emailId}/${id}.json`
      );
      if (res.statusText === "OK") {
        // getExpenses();
        dispatch(deleteExpense(id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getExpenses();
  }, []);
  return (
    <div style={{ height: "100vh" }}>
      {/** Expense Form */}
      <AddExpense
        expenseItem={expenseItem}
        setExpenseItem={setExpenseItem}
        isEdited={isEdited}
        getExpenses={getExpenses}
        setIsEdited={setIsEdited}
        emailId={emailId}
      />
      <Row className="mt-5">
        <Col>
          <h3 className="display-5 text-center">Daily Expenses</h3>
        </Col>
      </Row>
      {!expenses.length && (
        <Row>
          <Col>
            <h3 className="fs-1 text-black-50 text-center mt-4">
              No Expenses Found.
            </h3>
          </Col>
        </Row>
      )}

      {expenses.length ? (
        <Row className="mt-4">
          <Col>
            <ExpenseTable
              expenses={expenses}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              getExpenses={getExpenses}
            />
          </Col>
        </Row>
      ) : (
        ""
      )}
    </div>
  );
};

export default ExpenseList;
