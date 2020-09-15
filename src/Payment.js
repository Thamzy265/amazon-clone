import React, { useState, useEffect } from "react";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { getSubTotal } from "./reducer";
import CurrencyFormat from "react-currency-format";
import { useHistory } from "react-router-dom";
import axios from "./axios";
import { db } from "./firebase";

function Payment() {
	const history = useHistory();
	const [{ basket, user }, dispatch] = useStateValue();

	const [processing, setProcessing] = useState("");
	const [succeded, setSucceded] = useState(false);
	const [disabled, setDisabled] = useState(true);
	const [error, setError] = useState(true);
	const [clientSecret, setClientSecret] = useState(true);

	const stripe = useStripe();
	const elements = useElements();

	useEffect(() => {
		//Getting clientSecret from the api to be able to process payment
		//When ever item is removed on this page it will send a request to get new secret
		//amount is sent mulitplied with 100 to get the whole amount in dollars

		const getClientSecret = async () => {
			const res = await axios({
				method: "post",
				url: `/payment/create?total=${getSubTotal(basket) * 100}`,
			});

			setClientSecret(res.data.clientSecret);
		};
		getClientSecret();
	}, [basket]);

	const handleSubmit = async (event) => {
		event.preventDefault();
		setProcessing(true);

		const payload = await stripe
			.confirmCardPayment(clientSecret, {
				payment_method: {
					card: elements.getElement(CardElement),
				},
			})
			.then(({ paymentIntent }) => {
				//saving items in db

				db.collection("users")
					.doc(user?.uid)
					.collection("orders")
					.doc(paymentIntent.id)
					.set({
						basket: basket,
						amount: paymentIntent.amount,
						created: paymentIntent.created,
					});

				//clearing data
				setProcessing(false);
				setSucceded(true);
				setError(null);

				//clearing basket
				dispatch({
					type: "EMPTY_BASKET",
				});

				//redirecting to orders page
				history.replace("/orders");
			})
			.catch((error) => setError(error.message));
	};

	const handleChange = (event) => {
		setDisabled(event.empty);
		setError(event.error ? event.error.message : "");
	};

	return (
		<div className='payment'>
			<div className='payment__top'>
				<h2>Checkout({basket.length} items)</h2>
			</div>
			<div className='payment__container'>
				<div className='payment__section'>
					<div className='payment__title'>
						<h3>Delivery Address</h3>
					</div>
					<div className='payment__address'>
						<p>{user?.email}</p>
						<p>265 Mdubs</p>
						<p>Liongwe Malawi</p>
					</div>
				</div>

				<div className='payment__section'>
					<div className='payment__title'>
						<h3>Review items and delivery</h3>
					</div>
					<div className='payment__items'>
						{basket?.map((item, index) => (
							<CheckoutProduct
								key={index}
								price={item.price}
								title={item.title}
								image={item.image}
								rating={item.rating}
							/>
						))}
					</div>
				</div>
				<div className='payment__section'>
					<div className='payment__title'>
						<h3>Payment Method</h3>
					</div>
					<div className='payment__card'>
						<form onSubmit={handleSubmit}>
							<h4>Card Details</h4>
							<CardElement
								className='payment__cardElement'
								onChange={handleChange}
							/>
							<div className='payment__info'>
								<CurrencyFormat
									renderText={(value) => (
										<>
											<h3>Order Total: {value}</h3>
										</>
									)}
									decimalScale={2}
									value={getSubTotal(basket)}
									displayType={"text"}
									thousandSeparator={true}
									prefix={"$"}
								/>

								<button
									disabled={processing || disabled || succeded}
									type='submit'
									className='payment__button'
								>
									{processing ? <p>Processing</p> : "Buy Now"}
								</button>

								{error}
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Payment;
