import { productsArr } from "../utility/constants";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useContext } from "react";
import cartContext from "../contexts/cartContext";
import { Link } from "react-router-dom";
const Products = () => {
  const { onAddToCart } = useContext(cartContext);
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
          <h3 className="display-6  mt-4 fw-medium  text-center">MUSIC</h3>
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
                  className="img-fluid "
                />
                <Row className="align-items-center mb-4">
                  <Col md>
                    <p>{product.price}</p>
                  </Col>
                  <Col md>
                    <Button
                      variant="info"
                      onClick={() => onAddToCart({ ...product })}
                    >
                      Add to Cart
                    </Button>
                  </Col>
                </Row>
              </Link>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default Products;
