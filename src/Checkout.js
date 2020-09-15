import React from "react";
import "./Checkout.css";
import banner from "./images/banner.jpg";
import SubTotal from "./SubTotal";
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "./StateProvider";

function Checkout() {
	const [{ basket }] = useStateValue();
	return (
		<div className='checkout'>
			<div className='checkout__top'>
				<div className='checkout__banner'>
					<img className='checkout__img' src={banner} alt='' />
					{basket?.length === 0 ? (
						<div className='checkout__bannerInfo'>
							<h2>Your Shopping Cart is empty</h2>
							<p>
								You have no items in your cart.
								<br /> Sign In or Create an account, To buy one or more items,
								click "Add to cart" next to the item.
							</p>
						</div>
					) : (
						<div className='checkout__bannerInfo'>
							<h2>Your Shopping Cart</h2>
						</div>
					)}
				</div>
				{basket?.length !== 0 ? (
					<div className='checkout__subtotal'>
						<SubTotal />
					</div>
				) : (
					<div></div>
				)}
			</div>
			<div className='checkout__products'>
				{basket.map((item, index) => (
					<CheckoutProduct
						key={index}
						id={item.id}
						image={item.image}
						title={item.title}
						price={item.price}
						rating={item.rating}
					/>
				))}
			</div>
		</div>
	);
}

export default Checkout;
