const fs = require("fs");
const Time = require("./Time");

class Fee extends Time {
	constructor(getParkingTime) {
		super(getParkingTime);
	}

	getFirstHourFee = (vehicleType) => {
		return JSON.parse(
			fs.readFileSync(`./textDatabase/fees/${vehicleType}.txt`)
		);
	};

	getParkingFee = (masuk, keluar, fee) => {
		const parkingTime = this.getParkingTime(masuk, keluar);

		return fee + (parkingTime >= 1 ? parkingTime - 1 : 0) * (0.2 * fee);
	};
}

module.exports = Fee;
