import { useContext } from "react";
import Button from "react-bootstrap/Button";
import classes from "./SingleProduct.module.css";
import { useParams } from "react-router-dom";
import { productsArr } from "../utility/constants";
import cartContext from "../contexts/cartContext";
import authContext from "../contexts/authContext";
const SingleProduct = () => {
  const { productId } = useParams();
  const { userName } = useContext(authContext);
  const { addSingleProduct, cartData } = useContext(cartContext);
  const addToCart = async (data) => {
    const filteredProduct = cartData.filter(
      (product) => product.id === data.id
    );
    if (!filteredProduct.length) {
      data = { ...data, quantity: 1 };
      addSingleProduct({ ...data, quantity: 1 });
      alert("Item successfully added to the cart");
    } else {
      alert("The product has already been added to your cart.");
      return;
    }
    try {
      const res = await fetch(
        `https://crudcrud.com/api/${
          import.meta.env.VITE_KEY_URL
        }/cart${userName}`,
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
        console.log(resData);
        console.log("Successfully added to cart", resData);
      } else {
        throw new Error("An error occurred while adding the item to the cart");
      }
    } catch (error) {
      alert(error);
    }
  };
  const filteredItems = productsArr.filter((product) => {
    return product.id === productId;
  });
  if (filteredItems.length === 0) {
    return (
      <h3 style={{ margin: "300px 0", textAlign: "center" }}>
        No product found...
      </h3>
    );
  }
  const filterObject = filteredItems[0];

  const { imageUrl, image1, image2, price, title, description, review } =
    filterObject;
  return (
    <div
      style={{
        display: "flex",
        marginTop: "100px",
        justifyContent: "center",
        // gap: "10px",
        margin: "100px auto",
        border: "1px solid black",
        position: "relative",
      }}
    >
      <div
        className={classes.image_container}
        style={{
          width: "125px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <img src={imageUrl} alt="main image" />
        <img src={image1} alt="alternative image1" />
        <img src={image2} alt="alternative image2" />
      </div>
      <div className={classes.main_image_div}>
        <img src={imageUrl} alt="main image" />
        <div>
          <h3>{title}</h3>
          <h4>₹ {price}</h4>
          <p style={{ maxWidth: "500px" }}>
            <strong>Description: </strong>
            {description}
          </p>
        </div>
      </div>
      <div
        style={{
          marginTop: "50px",
        }}
      >
        <Button onClick={() => addToCart(filterObject)}>Add To Cart</Button>
        <div>
          <strong>Review: </strong>
          {review}
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
