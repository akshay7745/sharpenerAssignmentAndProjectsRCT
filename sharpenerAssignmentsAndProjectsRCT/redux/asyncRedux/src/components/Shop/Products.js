import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        <ProductItem
          title="Shirt"
          price={6}
          description="This is a first product - amazing!"
          id={"p1"}
        />
        <ProductItem
          title="Pant"
          price={10}
          description="This is a first product - amazing!"
          id={"p2"}
        />
        <ProductItem
          title="Charger"
          price={15}
          description="This is a first product - amazing!"
          id={"p3"}
        />
      </ul>
    </section>
  );
};

export default Products;
