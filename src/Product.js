import React from "react";
import "./Product.css";
import { useStateValue } from "./StateProvider";
import StarRateIcon from "@material-ui/icons/StarRate";

function Product({ id, title, price, image, rating }) {
	const [{ user }, dispatch] = useStateValue();

	const addToBasket = () => {
		dispatch({
			type: "ADD_TO_BASKET",
			item: {
				id,
				title,
				price,
				image,
				rating,
			},
		});
	};
	return (
		<div className='product'>
			<div className='product_info'>
				<p className='product__title'>{title}</p>
				<div className='product__price'>
					<span>$</span>
					<strong>{price}</strong>
				</div>
				<div className='product__rating'>
					{Array(rating)
						.fill()
						.map((_, i) => (
							<p>
								<StarRateIcon className='starColor' />
							</p>
						))}
				</div>
			</div>

			<img className='product__image' src={image} alt='' />
			{user && (
				<button onClick={addToBasket} className='product__button'>
					Add to Cart
				</button>
			)}
		</div>
	);
}

export default Product;
