import { createContext, useState } from "react";

export const productContext = createContext();

const ProductContextProvider = (props) => {
  const [productData, setProductData] = useState([]);
  const handleProductData = (data) => {
    setProductData((prevState) => {
      return [...prevState, data];
    });
  };
  const restoreData = (data) => {
    setProductData(data);
  };
  return (
    <productContext.Provider
      value={{ restoreData, handleProductData, productData }}
    >
      {props.children}
    </productContext.Provider>
  );
};

export default ProductContextProvider;
