const express = require("express");
const morgan = require("morgan");
const db = require("./db/index");
const cors = require("cors");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

//get restaurants
app.get("/api/v1/restaurants", async (req, res) => {
  try {
    const results = await db.query("select * from restaurants");
    res.status(200).json({
      results: results.rows.length,
      data: {
        restaurants: results.rows
      }
    })
  } catch (err) {
    console.log(err)
  }
});

//get a restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
  console.log(req.params.id)
  try {
    //select * from restaurants where id = req.params.id
    const restaurant = await db.query("select * from restaurants where id = $1", [req.params.id])
    const reviews = await db.query("select * from reviews where id = $1", [req.params.id])
    res.status(200).json({
      status: "success",
      data: {
        restaurants: restaurant.rows[0],
        reviews: reviews.rows
      }
    })
  } catch (err) {
    console.log(err)
  }
})

//create a restaurant
app.post("/api/v1/restaurants", async (req, res) => {
  try {
    //Note code will hang if data is entered incorreclty on request body
    const results = await db.query("INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *", [req.body.name, req.body.location, req.body.price_range]);
    
    res.status(201).json({
      status: "successfully added",
      data: {
        restaurant: results.rows[0]
      }
    })
  } catch (err) {
    console.log(err)
  }
})

//update restaurants
app.put("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const results = await db.query("UPDATE restaurants SET name = $1, location = $2, price_range = $3 where id = $4 returning *", [req.body.name, req.body.location, req.body.price_range, req.params.id])
    res.status(200).json({
      status: "successfully updated",
      data: {
        restaurant: results.rows[0]
      }
    })
  } catch (err) {
    console.log(err)
  }
})

//delete restaurant
app.delete("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const results = await db.query("DELETE FROM restaurants where id = $1", [req.params.id])
    res.status(204).json({
      status: "successfully deleted"
    });
  } catch (err) {
    console.log(err)
  }
})

app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
})