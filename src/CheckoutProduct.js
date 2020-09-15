import React from "react";
import "./CheckoutProduct.css";
import StarRateIcon from "@material-ui/icons/StarRate";
import { useStateValue } from "./StateProvider";

function CheckoutProduct({ id, title, price, rating, image, hideButton }) {
	const [{ basket }, dispatch] = useStateValue();

	const removeItem = () => {
		console.log(id);
		dispatch({
			type: "REMOVE_FROM_BASKET",
			id: id,
		});
	};
	return (
		<div className='checkoutProduct'>
			<img src={image} alt='' />
			<div className='checkoutProduct__info'>
				<p className='checkoutProduct__title'>{title}</p>
				<div className='checkoutProduct__price'>
					<span>$</span>
					<strong>{price}</strong>
				</div>
				<div className='checkoutProduct__rating'>
					{Array(rating)
						.fill()
						.map((_, i) => (
							<p>
								<StarRateIcon className='starColor' />
							</p>
						))}
				</div>
				<div>
					{!hideButton && (
						<button onClick={removeItem} className='checkoutProduct__btn'>
							Remove from Cart
						</button>
					)}
				</div>
			</div>
		</div>
	);
}

export default CheckoutProduct;
