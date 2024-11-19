const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = async (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  // const product = new Product(null, title, imageUrl, description, price);
  // product
  //   .save()
  //   .then(() => {
  //     res.redirect("/");
  //   })
  //   .catch((err) => console.log(err));

  const product = await Product.create({ title, imageUrl, description, price });
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

  // const updatedProduct = new Product(
  //   updatedTitle,
  //   updatedImageUrl,
  //   updatedDesc,
  //   updatedPrice,
  //   prodId
  // );
  // updatedProduct.save();
};
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  Product.findByPk(prodId)
    .then((product) => {
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
  // Product.findById(prodId, (product) => {
  //   if (!product) {
  //     return res.redirect("/");
  //   }
  //   res.render("admin/edit-product", {
  //     pageTitle: "Edit Product",
  //     path: "/admin/edit-product",
  //     editing: !!editMode,
  //     product: product,
  //   });
  // });
};
exports.getProducts = (req, res, next) => {
  Product.findAll({})
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

  // Product.fetchAll().then(([rows, fieldData]) => {
  //   res.render("admin/products", {
  //     prods: rows,
  //     pageTitle: "Admin Products",
  //     path: "/admin/products",
  //   });
  // });
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
