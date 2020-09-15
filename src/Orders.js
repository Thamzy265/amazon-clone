import React, { useEffect, useState } from "react";
import "./Orders.css";
import { useStateValue } from "./StateProvider";
import { db } from "./firebase";
import Order from "./Order";

function Orders() {
	const [{ user }] = useStateValue();

	//States
	const [orders, setOrders] = useState([]);
	useEffect(() => {
		if (user) {
			db.collection("users")
				.doc(user?.uid)
				.collection("orders")
				.orderBy("created", "desc")
				.onSnapshot((snapshot) =>
					setOrders(
						snapshot.docs.map((doc) => ({
							id: doc.id,
							data: doc.data(),
						}))
					)
				);
		} else {
			setOrders([]);
		}
	}, [user]);

	return (
		<div className='orders'>
			<h2>Your Orders</h2>
			{orders?.length === 0 ? (
				<div className='orders__none'>
					<h4>YOU CURRENTLY HAVE NO ORDERS.</h4>
				</div>
			) : (
				orders.map((data, id) => <Order key={id} order={data} />)
			)}
		</div>
	);
}

export default Orders;
