const Razorpay = require("razorpay");
const Order = require("../models/order");

exports.premiumMembership = async (req, res, next) => {
  try {
    let rzp = new Razorpay({
      key_id: process.env.RAZOR_KEY_ID,
      key_secret: process.env.RAZOR_KEY_SECRET,
    });

    let amount = 1500;

    rzp.orders.create({ amount, currency: "INR" }, (err, order) => {
      if (err) {
        console.log("Error from rzp", err);
        throw new Error(JSON.stringify(err));
      }
      req.user
        .createOrder({ orderid: order.id, status: "PENDING" })
        .then(() => {
          return res.status(201).json({
            order,
            key_id: rzp.key_id,
          });
        })
        .catch((error) => {
          console.log("Error at create order", error);
          throw new Error(error);
        });
    });
  } catch (error) {
    console.log(error);
  }
};

exports.updateTransaction = async (req, res, next) => {
  const { payment_id, order_id } = req.body;
  try {
    const order = await Order.update(
      { status: "SUCCESSFULL", paymentid: payment_id },
      {
        where: {
          orderid: order_id,
        },
      }
    );
    await req.user.update({ isPremium: true });
    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};
