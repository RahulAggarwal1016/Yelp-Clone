//import pool from postgres
const { Pool } = require("pg");

//create new pool (which database to connect do) --> automatically knows from .env
const pool = new Pool();

module.exports = {
	//export a function that takes in text and queries the db based on the text
	query: (text, params) => pool.query(text, params),
};
