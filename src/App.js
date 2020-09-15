import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Checkout from "./Checkout";
import Home from "./Home";
import SignIn from "./SignIn";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import Payment from "./Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./Orders";

function App() {
	const stripePromise = loadStripe(
		"pk_test_Y45aWvOyDkSNxXh3i5X3et5h00C4TkVcjB"
	);
	const [{}, dispatch] = useStateValue();

	useEffect(() => {
		auth.onAuthStateChanged((auth) => {
			if (auth) {
				console.log(auth);
				dispatch({
					type: "SET_USER",
					user: auth,
				});
			} else {
				dispatch({
					type: "SET_USER",
					user: null,
				});
			}
		});
	}, []);

	return (
		<div className='App'>
			<Router>
				<Switch>
					<Route path='/login'>
						<SignIn />
					</Route>
					<Route path='/checkout'>
						<Header />
						<Checkout />
					</Route>
					<Route path='/Orders'>
						<Header />
						<Orders />
					</Route>
					<Route path='/payment'>
						<Header />
						<Elements stripe={stripePromise}>
							<Payment />
						</Elements>
					</Route>
					<Route path='/'>
						<Header />
						<Home />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
