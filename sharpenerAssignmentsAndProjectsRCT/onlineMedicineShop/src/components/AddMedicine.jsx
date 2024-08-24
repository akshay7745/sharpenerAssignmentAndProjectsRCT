import { useContext, useReducer } from "react";
import { medicineContext } from "../contexts/MedicineContextProvider";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";

const medicineReducer = (state, action) => {
  const type = action.type;
  const val = action.payload;
  if (type === "NAME") {
    return {
      ...state,
      name: val,
    };
  } else if (type === "DESCRIPTION") {
    return {
      ...state,
      description: val,
    };
  } else if (type === "PRICE") {
    return {
      ...state,
      price: val,
    };
  } else if (type === "STOCK") {
    return {
      ...state,
      stock: val,
      totalStock: val,
    };
  }

  return {
    name: "",
    description: "",
    price: "",
    stock: "",
    totalStock: "",
    addedToCart: false,
  };
};
const AddMedicine = () => {
  const [medicineState, medicineDispatcher] = useReducer(medicineReducer, {
    name: "",
    description: "",
    price: "",
    stock: "",
    totalStock: "",
    addedToCart: false,
  });
  const { name, description, price, stock } = medicineState;
  const { addAMedicine } = useContext(medicineContext);
  const changeHandler = (e) => {
    const name = e.target.name;
    if (name === "name") {
      medicineDispatcher({ type: "NAME", payload: e.target.value });
    } else if (name === "description") {
      medicineDispatcher({ type: "DESCRIPTION", payload: e.target.value });
    } else if (name === "price") {
      medicineDispatcher({ type: "PRICE", payload: e.target.value });
    } else if (name === "stock") {
      medicineDispatcher({ type: "STOCK", payload: e.target.value });
    }
  };

  const saveMedicineData = async (data) => {
    try {
      const res = await fetch(
        "https://crudcrud.com/api/98ff4bdeadcc46b980659074e5164fe4/medicines",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        const medicine = await res.json();
        addAMedicine(medicine);
      } else {
        throw new Error(
          "Something went wrong while adding a medicine to the store."
        );
      }
    } catch (error) {
      alert(error);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    saveMedicineData(medicineState);
  };
  return (
    <div className="mt-4">
      <h2 className="display-4 text-center">Online Medical Store</h2>
      <Form className="p-5 shadow mt-4" onSubmit={submitHandler}>
        <Form.Group as={Row} className="mb-3" controlId="name">
          <Form.Label column sm="2">
            Medicine Name
          </Form.Label>
          <Col md="7">
            <Form.Control
              onChange={changeHandler}
              name="name"
              value={name}
              required={true}
              placeholder="Enter Name"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="description">
          <Form.Label column sm="2">
            Description
          </Form.Label>
          <Col md="7">
            <Form.Control
              as="textarea"
              value={description}
              type="text"
              onChange={changeHandler}
              name="description"
              required={true}
              placeholder="Enter Description"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="price">
          <Form.Label column sm="2">
            Price
          </Form.Label>
          <Col md="7">
            <Form.Control
              onChange={changeHandler}
              name="price"
              value={price}
              required={true}
              type="number"
              placeholder="Enter price"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="stock">
          <Form.Label column sm="2">
            Quantity
          </Form.Label>
          <Col md="7">
            <Form.Control
              onChange={changeHandler}
              name="stock"
              value={stock}
              required={true}
              type="number"
              placeholder="Enter Quantity"
            />
          </Col>
        </Form.Group>
        <Button variant="secondary" className="text-center " type="submit">
          Add Medicine
        </Button>
      </Form>
    </div>
  );
};

export default AddMedicine;
