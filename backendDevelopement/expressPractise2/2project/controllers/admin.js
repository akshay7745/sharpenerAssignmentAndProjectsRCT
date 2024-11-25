const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  req.user
    .createProduct({ title, imageUrl, description, price })
    .then((result) => {
      console.log("Product created");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));

  res.redirect("/");
};

exports.postEditProduct = async (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  const product = await Product.update(
    {
      title: updatedTitle,
      price: updatedPrice,
      description: updatedDesc,
      imageUrl: updatedImageUrl,
    },
    {
      where: {
        id: prodId,
      },
    }
  );

  res.redirect("/admin/products");
};
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  // Product.findByPk(prodId)
  req.user
    .getProducts({
      where: {
        id: prodId,
      },
    })
    .then((products) => {
      const product = products[0];
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: !!editMode,
        product: product,
      });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/");
    });
};
exports.getProducts = (req, res, next) => {
  // Product.findAll({})
  req.user
    .getProducts()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => {
      console.log("Something went wrong while getting admin products.");
    });
};

exports.deleteProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.destroy({
    where: {
      id: prodId,
    },
  })
    .then((result) => {
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
  // Product.deleteById(prodId)
  //   .then((product) => {
  //     res.redirect("/admin/products");
  //   })
  //   .catch((err) => console.log(err));
};
