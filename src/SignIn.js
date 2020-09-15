import React, { useState } from "react";
import "./SignIn.css";
import amazon from "./amazon.png";
import { Link, useHistory } from "react-router-dom";
import { auth } from "./firebase";

function SignIn() {
	const history = useHistory();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [feedback, setFeedback] = useState("");

	const signIn = (e) => {
		e.preventDefault();

		auth
			.signInWithEmailAndPassword(email, password)
			.then((auth) => history.push("/"))
			.catch((err) => {
				setFeedback(err.message);
				console.log(err);
			});
	};

	const createUser = () => {
		auth
			.createUserWithEmailAndPassword(email, password)
			.then((auth) => history.push("/"))
			.catch((err) => {
				setFeedback(err.message);
				console.log(err);
			});
	};

	return (
		<div className='signIn'>
			<div className='signIn__container'>
				<Link to='/'>
					<img className='signIn__logo' src={amazon} alt='' />
				</Link>
				<div className='signIn__card'>
					<h3>Sign-in</h3>
					<div className='signIn__feedback'>
						{feedback !== "" && <p>{feedback}</p>}
					</div>
					<form className='signIn__form'>
						<h5>E-mail</h5>
						<input
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							type='email'
						/>
						<h5>Password</h5>
						<input
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							type='password'
						/>
						<button type='submit' onClick={signIn} className='signIn__signBtn'>
							Sign In
						</button>
					</form>
					<small>
						By signing-in you agree to Amazon's Conditions of Use & Sale. Please
						see our Privacy Notice, our Cookies Notice and our Interest-Based
						Ads Notice.
					</small>
					<button onClick={createUser} className='signIn__createBtn'>
						Create your Amazon Account
					</button>
				</div>
			</div>
		</div>
	);
}

export default SignIn;
