const express = require("express");
const { parkingRouter } = require("./router");

const app = express();
const bodyParser = express.json();
const PORT = 2000;

app.get("/", (req, res) => {
	res.status(200).send("<h1>Parking Lot API</h1>");
});

app.use(bodyParser);
app.use("/parking", parkingRouter);

app.listen(PORT, () => {
	console.log(`PARKING LOT API ACTIVE`);
});
