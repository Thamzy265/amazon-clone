const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("");

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => res.status(200).send("hello world"));

app.post("/payment/create", async (req, res) => {
	const total = req.query.total;

	const paymentIntent = await stripe.paymentIntents.create({
		amount: total,
		currency: "usd",
	});

	res.status(201).send({
		clientSecret: paymentIntent.client_secret,
	});
});

exports.api = functions.https.onRequest(app);
