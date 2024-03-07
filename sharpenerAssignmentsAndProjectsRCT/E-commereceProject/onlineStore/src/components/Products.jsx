import { productsArr } from "../utility/constants";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useContext } from "react";
import cartContext from "../contexts/cartContext";
import { Link } from "react-router-dom";
import authContext from "../contexts/authContext";
const Products = () => {
  // const { onAddToCart } = useContext(cartContext);
  const { userName } = useContext(authContext);
  const addToCart = async (data) => {
    try {
      const res = await fetch(
        `https://crudcrud.com/api/a1d6682b14c44c0c918d9ea2d0c1c75a/cart${userName}`,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        const resData = await res.json();
        console.log("Successfully added to cart", resData);
      } else {
        throw new Error("Something went wrong while adding to cart");
      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <>
      <Row className=" bg-secondary py-5 ">
        <Col>
          <h1 className="mt-5 display-1 text-center text-white fw-bold ">
            The Generics
          </h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <h3 className="display-6  mt-4 fw-medium  text-center">Clothes</h3>
        </Col>
      </Row>
      <Row className="justify-content-center text-center p-5">
        {productsArr.map((product) => {
          return (
            <Col md={5} key={product.id}>
              <Link
                className="text-decoration-none  text-black "
                to={`/product/${product.id}`}
              >
                <h4 className="mb-4  ">{product.title}</h4>
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="img-fluid w-50"
                />
              </Link>
              <Row className="align-items-center mb-4">
                <Col md>
                  <p>₹ {product.price}</p>
                </Col>
                <Col md>
                  <Button
                    variant="info"
                    // onClick={() => onAddToCart({ ...product })}
                    onClick={() => {
                      addToCart(product);
                    }}
                  >
                    Add to Cart
                  </Button>
                </Col>
              </Row>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default Products;
