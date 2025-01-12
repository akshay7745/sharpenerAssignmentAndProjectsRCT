import Table from "react-bootstrap/esm/Table";
import Button from "react-bootstrap/esm/Button";
const ExpenseTable = ({ expenses, handleDelete, handleEdit, getExpenses }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Task</th>
          <th>Description</th>
          <th>Amount</th>
          <th>Edit Tasks</th>
          <th>Delete Tasks</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense, ind) => {
          const { description, amount, category, id } = expense;
          return (
            <tr key={id}>
              <td>{ind + 1}</td>
              <td>{category}</td>
              <td>{description}</td>
              <td>{amount}</td>
              <td>
                <Button
                  variant="success"
                  type="button"
                  onClick={() => {
                    confirm("Do you really want to edit the task")
                      ? handleEdit(expense)
                      : "";
                  }}
                >
                  Edit
                </Button>
              </td>
              <td>
                <Button
                  onClick={() => {
                    handleDelete(id);
                    // getExpenses();
                  }}
                  variant="danger"
                  type="button"
                >
                  Delete
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default ExpenseTable;
