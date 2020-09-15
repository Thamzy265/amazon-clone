import React from "react";
import heroImage from "./images/1.jpg";
import "./Home.css";
import Product from "./Product";

function Home() {
	return (
		<div className='home'>
			<div className='home__container'>
				<img className='home__image' alt='hero' src={heroImage} />
				<div className='home__row'>
					<Product
						id={1000}
						title='Mpow CH6S Kids Headphones with Microphone Over-Ear/On-Ear, HD Sound Sharing Function Headphones for Children Boys Girls, Volume Limited Safe 85dB/94dB Foldable Headset w/Mic for School/PC/Cellphone'
						price={400}
						rating={4}
						image='https://m.media-amazon.com/images/I/71zNVVc9ZPL._AC_UL320_.jpg'
					/>
					<Product
						id={1200}
						title='TOZO T6 True Wireless Earbuds Bluetooth Headphones Touch Control with Wireless Charging Case IPX8 Waterproof TWS Stereo Earphones in-Ear Built-in Mic Headset Premium Deep Bass for Sport Black'
						price={10000}
						rating={2}
						image='https://m.media-amazon.com/images/I/71CH1MwvxyL._AC_UL800_FMwebp_QL65_.jpg'
					/>
				</div>
				<div className='home__row'>
					<Product
						id={1300}
						title='JBL Flip 4 Waterproof Portable Bluetooth Speaker - Black, Medium (JBLFLIP4BK)'
						price={500}
						rating={4}
						image='https://m.media-amazon.com/images/I/61d5F64UDpL._AC_UL640_FMwebp_QL65_.jpg'
					/>
					<Product
						id={1400}
						title='AmazonBasics Closet Storage Organizer with Bins and Shelving'
						price={400}
						rating={4}
						image='https://m.media-amazon.com/images/I/91JgtedH4uL._AC_UY545_FMwebp_QL65_.jpg'
					/>
					<Product
						id={1400}
						title='Under Armour boys Tech Big Logo Solid T-shirt'
						price={400}
						rating={4}
						image='https://m.media-amazon.com/images/I/51Zse0CGsyL._AC_UL800_FMwebp_QL65_.jpg'
					/>
				</div>
				<div className='home__row'>
					<Product
						id={1500}
						title='If You Tell: A True Story of Murder, Family Secrets, and the Unbreakable Bond of Sisterhood'
						price={400}
						rating={4}
						image='https://m.media-amazon.com/images/I/410K-S--pmL.jpg'
					/>
				</div>
			</div>
		</div>
	);
}

export default Home;
