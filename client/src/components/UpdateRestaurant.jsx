import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";

const UpdateRestaurant = (props) => {
	const { id } = useParams();
	const [name, setName] = useState("");
	const [location, setLocation] = useState("");
	const [priceRange, setPriceRange] = useState("");
	let history = useHistory();

	useEffect(() => {
		const fetchData = async () => {
			const response = await RestaurantFinder.get(`/${id}`);
			setName(response.data.data.restaurants.name);
			setLocation(response.data.data.restaurants.location);
			setPriceRange(response.data.data.restaurants.price_range);
		};
		fetchData();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const updatedRestaurant = await RestaurantFinder.put(`/${id}`, {
			name,
			location,
			price_range: priceRange,
		});
		history.push("/");
	};

	return (
		<div>
			<form action="">
				<div className="form-group">
					<label htmlFor="name">Name</label>
					<input
						id="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						type="text"
						className="form-control"
					/>
				</div>

				<div className="form-group">
					<label htmlFor="location">location</label>
					<input
						id="location"
						value={location}
						onChange={(e) => setLocation(e.target.value)}
						type="text"
						className="form-control"
					/>
				</div>

				<div className="form-group">
					<label htmlFor="price_range">Price Range</label>
					<input
						id="price_range"
						type="number"
						value={priceRange}
						onChange={(e) => setPriceRange(e.target.value)}
						className="form-control"
					/>
				</div>

				<button
					type="submit"
					onClick={handleSubmit}
					className="btn btn-primary"
				>
					Submit
				</button>
			</form>
		</div>
	);
};

export default UpdateRestaurant;
