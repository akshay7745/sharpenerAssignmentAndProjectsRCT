import { createContext, useEffect, useState } from "react";

export const productContext = createContext();

const ProductContextProvider = (props) => {
  const [allProducts, setAllProducts] = useState([]);

  const addSingleProduct = (data) => {
    setAllProducts((prevState) => {
      return [...prevState, data];
    });
  };

  const addAllProducts = (data) => {
    setAllProducts(data);
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  const getAllProducts = async () => {
    try {
      const res = await fetch(
        "https://crudcrud.com/api/ecc4d0efc47244d9994e0757d5eb6781/products"
      );
      if (res.ok) {
        const products = await res.json();
        addAllProducts(products);
      } else {
        throw new Error("No products found add few to the store");
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <productContext.Provider
      value={{ addSingleProduct, allProducts, addAllProducts }}
    >
      {props.children}
    </productContext.Provider>
  );
};

export default ProductContextProvider;
