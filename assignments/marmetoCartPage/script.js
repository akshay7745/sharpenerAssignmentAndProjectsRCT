const tbody = document.getElementById("tBody");
const cartSubtotalParent =
  document.getElementsByClassName("cart-total-items")[0];
const cartTotalAmount = document.getElementsByClassName("cart-total-price")[0];

const formatInRupees = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
});

let cartData;
document.addEventListener("DOMContentLoaded", (e) => {
  fetchCartData(
    "https://cdn.shopify.com/s/files/1/0883/2188/4479/files/apiCartData.json?v=1728384889"
  ).then((data) => {
    cartData = data;
    updateCartData(data);
    updateCartAmount(data);
  });
});

async function fetchCartData(url) {
  try {
    const res = await fetch(url);
    const cartData = await res.json();
    console.log("cartData", cartData);
    return cartData;
  } catch (error) {
    console.log("Something went wrong", error);
  }
}

function handleChange(id, element) {
  console.log(id, element.value);
  const cartItem = cartData.items.find((item) => +id === item.id);
  cartItem.quantity = +element.value;

  updateCartData(cartData);
  updateCartAmount(cartData);
}

function handleDelete(id) {
  const updatedCartItems = cartData.items.filter((item) => item.id !== +id);
  cartData.items = updatedCartItems;
  updateCartData(cartData);
  updateCartAmount(cartData);
}

function updateCartData(data) {
  console.log("data", data);
  const cartItems = data.items.map((cartItem) => {
    const { id, quantity, title, image, price } = cartItem;
    return `<tr >
                    <td>
                      <div class="product-info">
                        <div class="product-img-container">
                          <img src=${image} alt=${title} />
                        </div>
                        <span class="product-name">${title}</span>
                      </div>
                    </td>
                    <td class="product-price">${formatInRupees.format(
                      price / 100
                    )}</td>
                    <td class="quantity">
                      <div>
                        <input type="number" min="1" class='${id} quantity'value=${quantity} onchange='handleChange(${id},this)' />
                      </div>
                    </td>
                    <td>
                      <div class="delete-icon">
                        <span class="subPrice">${formatInRupees.format(
                          price / 100
                        )}</span>
                        <div class="delete">
                          <img onclick='handleDelete(${id})' src="./images/delete.png" alt="delete icon" id=${id}  />
                        </div>
                      </div>
                    </td>
                  </tr>`;
  });

  tbody.innerHTML = cartItems;
}

function updateCartAmount(data) {
  const subTotalElements = data.items.map((cartItem) => {
    const { presentment_price, quantity } = cartItem;
    return `  <div class="subTotal-wrapper">
                  <span class="cart-subTotal">Subtotal</span
                  ><span class="cart-subTotal-price">${formatInRupees.format(
                    presentment_price * +quantity
                  )}</span>
                </div>`;
  });
  let totalAmount = data.items.reduce((acc, item) => {
    acc += item.presentment_price * +item.quantity;
    return acc;
  }, 0);
  cartSubtotalParent.innerHTML = subTotalElements;
  if (data.items.length) {
    cartTotalAmount.innerHTML = formatInRupees.format(totalAmount);
  } else {
    cartTotalAmount.innerHTML = 0;
  }
}
