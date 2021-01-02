import React, { useState, useContext } from 'react'
import RestaurantFinder from "../apis/RestaurantFinder";

function AddRestaurant() {
  const [name, setName] = useState("")
  const [priceRange, setPriceRange] = useState("Price Range")
  const [location, setLocation] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await RestaurantFinder.post("/", {
        name, location, price_range: priceRange
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="mb-4">
      <div className="form-row">
        <div className="col">
          <input value={name} onChange={e => setName(e.target.value)} type="text" className="form-control" placeholder="name" />
        </div>
        <div className="col">
          <input value={location} onChange={e => setLocation(e.target.value)} type="text" className="form-control" placeholder="location" />
        </div>
        <div className="col">
          <select className="custom-select my-1 mr-sm-2" value={priceRange} onChange={e => setPriceRange(e.target.value)}>
            <option disabled>Price Range</option>
            <option value="1">$</option>
            <option value="2">$$</option>
            <option value="3">$$$</option>
            <option value="4">$$$$</option>
            <option value="5">$$$$$</option>
          </select>
        </div>
        <button type="submit" onClick={handleSubmit} className="btn btn-primary">Add</button>
      </div>
    </div>
  )
}

export default AddRestaurant
