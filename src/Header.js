import React from "react";
import logo from "./logo.png";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCart from "@material-ui/icons/ShoppingCartOutlined";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";

function Header() {
	const [{ basket, user }] = useStateValue();

	const login = () => {
		if (user) {
			auth.signOut();
		}
	};

	return (
		<nav className='header'>
			<div className='header__nav'>
				<Link to='/'>
					<img className='header__logo' src={logo} alt='logo' />
				</Link>
				<div className='header__search'>
					<input className='header__searchInput' type='text' />
					<SearchIcon className='header__searchIcon' />
				</div>
				<div className='header__links'>
					<Link to={!user && "/login"} className='header__link'>
						<div onClick={login} className='header__options'>
							<span className='header__optionOne'>
								Hello{user !== null && `, ${user.email}`}
							</span>
							<span className='header__optionTwo'>
								{user == null ? "Sign In" : "Sign Out"}
							</span>
						</div>
					</Link>
					<Link to='/orders' className='header__link'>
						<span className='header__optionOne'>Returns</span>
						<span className='header__optionTwo'>& Order</span>
					</Link>
					<Link to='/checkout' className='header__shoppingCart'>
						<ShoppingCart className='header__optionTwo' />
						<span className='header__shoppingItem'>{basket.length}</span>
					</Link>
				</div>
			</div>
			<div className='header__searchSmall'>
				<input className='header__searchInput' type='text' />
				<SearchIcon className='header__searchIcon' />
			</div>
		</nav>
	);
}

export default Header;
