import React from "react";
import "./Order.css";
import CheckoutProduct from "./CheckoutProduct";
import moment from "moment";
import CurrencyFormat from "react-currency-format";

function Order({ order }) {
	return (
		<div className='order__container'>
			<div className='order__info'>
				<div className='order__date'>
					<h3>Order</h3>
					<p>{moment.unix(order.data.created).format("MMMM Do YYY, h:mma")}</p>
				</div>
				<small>{order.id}</small>
			</div>
			<div className='order__items'>
				{order.data.basket?.map((item, index) => (
					<CheckoutProduct
						key={index}
						id={item.id}
						price={item.price}
						title={item.title}
						rating={item.rating}
						image={item.image}
						hideButton={true}
					/>
				))}
			</div>
			<div className='order__total'>
				<CurrencyFormat
					renderText={(value) => (
						<>
							<h3>Order Total: {value}</h3>
						</>
					)}
					decimalScale={2}
					value={order.data?.amount / 100}
					displayType={"text"}
					thousandSeparator={true}
					prefix={"$"}
				/>
			</div>
		</div>
	);
}

export default Order;
