// set up server here
const cors = require("cors");
const express = require("express");
require("dotenv").config();
const app = express();
const bodyParser = require("body-parser");

const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST_KEY);

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cors());

app.post("/payment", cors(), async (req, res) => {
  let { amount, id } = req.body;

  const customer = await stripe.customers.create();

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Purchase from My Shop",
      payment_method: id,
      confirm: true,
      customer: customer.id,
    })
    
    console.log(payment)
    res.json({
      message: "Payment Successful",
      success: true
    })
  } catch (error) {
    console.log("Error", error);
    res.json({
      message: "Payment Failed",
      success: false
    })
  }
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT: ${PORT}`);
});