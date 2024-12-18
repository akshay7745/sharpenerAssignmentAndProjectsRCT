const SibApiV3Sdk = require("sib-api-v3-sdk");
const sequelize = require("../utils/database");
const User = require("../models/user");
const ForgotPasswordRequest = require("../models/forgotPasswordRequest");

exports.forgotPassword = async (req, res, next) => {
  try {
    const t = await sequelize.transaction();

    const { email } = req.body;

    const user = await User.findOne({
      where: {
        email,
      },
      transaction: t,
    });
    const forgotPasswordRequest = await user.createForgotPasswordRequest({
      transaction: t,
    });

    const defaultClient = SibApiV3Sdk.ApiClient.instance;
    const apiKey = defaultClient.authentications["api-key"];
    apiKey.apiKey = process.env.EMAIL_API_KEY;

    const transactionalEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

    const sender = {
      email: "akshay7745@gmail.com",
      name: "Expense tracker support team",
    };

    const receivers = [{ email }];

    const response = await transactionalEmailApi.sendTransacEmail({
      sender,
      to: receivers,
      subject: "Reset password",
      htmlContent: `<h1>Expense Tracker Support</h1><p>To reset the password click the link below and set new password</p>
      <a href='http://localhost:3000/password/resetpassword/${forgotPasswordRequest.id}'>Click here to Reset password</a>
      <h3>Thank you</h3>
      `,
    });
    await t.commit();
    res.status(201).json({ message: response });
  } catch (error) {
    await t.rollback();
    res.status(500).json({
      error,
      message: "Something went wrong while resetting password",
    });
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { id } = req.params;
    const forgotPassReq = await ForgotPasswordRequest.findOne({
      where: { id },
    });

    const user = await forgotPassReq.getUser();

    if (!forgotPassReq.isActive) {
      throw new Error("Password reset link expired....");
    }

    //    const updatedReq = await forgotPassReq.update({isActive:false});

    res.send(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Reset password</title>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
      crossorigin="anonymous"
    />
  </head>
  <body>
    <section class="container-fluid mt-md-5">
      <div class="row justify-content-center">
        <div class="col col-md-5">
          <h2 class="text-center fs-2 text-black-50">Update Password</h2>
          <form action='/password/updatepassword' id="login" class="my-3" method="post">
            <div class="border border-2 p-4 rounded-2">
              <div class="mb-3">
                <input type="hidden" class="form-control" id="email" name='email' value='${user.email}' />
              </div>
              <div class="mb-3">
                <input type="hidden" class="form-control" id="uuid" name='uuid' value='${id}' />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" name='password' class="form-control" required id="password" />
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </body>
</html>
`);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong after sending reset password link",
      error,
    });
  }
};
