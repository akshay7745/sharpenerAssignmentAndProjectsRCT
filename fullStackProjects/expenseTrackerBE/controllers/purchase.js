const Razorpay = require("razorpay");
const Order = require("../models/order");
const generateAccessToken = require("../utils/generateAccessToken");
const sequelize = require("../utils/database");

exports.premiumMembership = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    let rzp = new Razorpay({
      key_id: process.env.RAZOR_KEY_ID,
      key_secret: process.env.RAZOR_KEY_SECRET,
    });

    const amount = 3500;

    rzp.orders.create({ amount, currency: "INR" }, (err, order) => {
      if (err) {
        throw new Error(JSON.stringify(err));
      }
      req.user
        .createOrder(
          { orderid: order.id, status: "PENDING" },
          { transaction: t }
        )
        .then(async () => {
          await t.commit();
          return res.status(201).json({
            order,
            key_id: rzp.key_id,
          });
        })
        .catch(async (error) => {
          throw new Error(error);
        });
    });
  } catch (error) {
    await t.rollback();
    res.status(500).json({
      error,
      message: "Something went wrong while purchasing premium membership",
    });
  }
};

exports.updateTransaction = async (req, res, next) => {
  const t = await sequelize.transaction();
  const { payment_id, order_id } = req.body;
  try {
    const order = await Order.update(
      { status: "SUCCESSFUL", paymentid: payment_id },
      {
        where: {
          orderid: order_id,
        },
        transaction: t,
      }
    );
    await req.user.update({ isPremium: true }, { transaction: t });
    const { name, id, email } = req.user;

    await t.commit();

    res.status(201).json({
      success: true,
      order,
      token: generateAccessToken(name, id, email, true),
    });
  } catch (error) {
    await t.rollback();

    res.status(500).json({
      success: false,
      message: error,
    });
  }
};
