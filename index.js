const express = require('express');
const cors = require('cors');
const db = require('./fileDb');
const forum = require('./app/forum');

db.init();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const port = 8000;

app.use('/forum', forum);

app.listen(port, () => {
	console.log(`Server started on ${port} port`);
});