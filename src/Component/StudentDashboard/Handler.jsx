// pages/api/payment_intents.js
import Stripe from "stripe";

const stripe = new Stripe("your_secret_key");

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { amount, paymentMethodId } = req.body;

      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "inr",
        payment_method: paymentMethodId,
        payment_method_types: ["card", "upi"], // Allow card and UPI payments
      });

      res.status(200).json(paymentIntent);
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}