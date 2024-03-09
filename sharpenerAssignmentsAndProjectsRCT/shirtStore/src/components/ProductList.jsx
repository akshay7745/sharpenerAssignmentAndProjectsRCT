import { useContext } from "react";
import { cartContext } from "../contexts/CartContextProvider";
import { productContext } from "../contexts/ProductContextProvider";

const ProductList = () => {
  const { addAProductToCart } = useContext(cartContext);
  const { allProducts, addAllProducts } = useContext(productContext);

  const saveToBackend = async (data) => {
    const { productData, cartData, productId } = data;
    try {
      const res = await fetch(
        "https://crudcrud.com/api/ecc4d0efc47244d9994e0757d5eb6781/cart",
        {
          method: "POST",
          body: JSON.stringify(cartData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        const cartData = await res.json();
        console.log(cartData, "CartData res");
        addAProductToCart(cartData);
        const productRes = await fetch(
          `https://crudcrud.com/api/ecc4d0efc47244d9994e0757d5eb6781/products/${productId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(productData),
          }
        );
        if (productRes.ok) {
          const getProducts = await fetch(
            `https://crudcrud.com/api/ecc4d0efc47244d9994e0757d5eb6781/products`
          );
          if (getProducts.ok) {
            const getProductsData = await getProducts.json();
            console.log(getProductsData, "After adding to cart");
            addAllProducts(getProductsData);
          }
        }
      } else {
        throw new Error(
          "Something went wrong while adding and storing product"
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  // const cartHandler = (data) => {
  //   // handleCartData(data);
  //   saveToBackend(data);
  // };
  return (
    <>
      <div>
        <h2>ShirtList</h2>
      </div>
      <table
        style={{
          border: "1px solid black",
          width: "800px",
          textAlign: "center",
        }}
      >
        <thead style={{ border: "1px solid black" }}>
          <tr>
            <th>Shirt Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>L</th>
            <th>M</th>
            <th>S</th>
          </tr>
        </thead>
        <tbody>
          {allProducts?.map((shirt) => {
            const { shirtName, description, price, sizeL, sizeM, sizeS, _id } =
              shirt;
            return (
              <tr style={{ border: "1px solid black" }} key={shirt._id}>
                <td>{shirtName}</td>
                <td>{description}</td>
                <td>₹ {price}</td>
                <td>
                  <button
                    onClick={() =>
                      saveToBackend({
                        productData: {
                          shirtName,
                          description,
                          price,
                          sizeL: Number(sizeL) - 1,
                          sizeM,
                          sizeS,
                        },
                        productId: _id,
                        cartData: {
                          shirtName,
                          description,
                          price,
                          productId: _id,
                        },
                      })
                    }
                    disabled={Number(sizeL) <= 0 ? true : false}
                  >
                    Buy L {sizeL}
                  </button>
                </td>
                <td>
                  <button
                    disabled={Number(sizeM) <= 0 ? true : false}
                    onClick={() =>
                      saveToBackend({
                        productData: {
                          shirtName,
                          description,
                          price,
                          sizeM: Number(sizeM) - 1,
                          sizeL,
                          sizeS,
                        },
                        productId: _id,
                        cartData: {
                          shirtName,
                          description,
                          price,
                          productId: _id,
                        },
                      })
                    }
                  >
                    Buy M {sizeM}
                  </button>
                </td>
                <td>
                  <button
                    disabled={Number(sizeS) <= 0 ? true : false}
                    onClick={() =>
                      saveToBackend({
                        productData: {
                          shirtName,
                          description,
                          price,
                          sizeS: Number(sizeS) - 1,
                          sizeM,
                          sizeL,
                        },
                        productId: _id,
                        cartData: {
                          shirtName,
                          description,
                          price,
                          productId: _id,
                        },
                      })
                    }
                  >
                    Buy S {sizeS}
                  </button>
                </td>
                <td></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default ProductList;
