import React from "react";
import "./SubTotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "./StateProvider";
import { getSubTotal } from "./reducer";
import { useHistory } from "react-router-dom";

function SubTotal() {
	const history = useHistory();
	const [{ basket }] = useStateValue();

	return (
		<div className='subtotal'>
			<CurrencyFormat
				renderText={(value) => (
					<>
						<p>
							Subtotal ({basket.length} items): <strong>{value}</strong>
						</p>
						<small className='subtotal__gift'>
							<input className='subtotal__checkbox' type='checkbox' /> This
							order contains a gift
						</small>
					</>
				)}
				decimalScale={2}
				value={getSubTotal(basket)}
				displayType={"text"}
				thousandSeparator={true}
				prefix={"$"}
			/>
			<button
				onClick={(e) => history.push("/payment")}
				className='subtotal__btn'
			>
				Proceed to Chekout
			</button>
		</div>
	);
}

export default SubTotal;
