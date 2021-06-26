const fs = require("fs");

class Lot {
	constructor() {}

	getLots = () => {
		return fs.readdirSync("./textDatabase/lots");
	};

	getLotData = (selectedLot) => {
		return JSON.parse(fs.readFileSync(`./textDatabase/lots/${selectedLot}`));
	};

	getAvailableLot = () => {
		let lots = this.getLots();

		lots.sort((a, b) => a.split(".txt")[0] - b.split(".txt")[0]);

		const available = lots.find((val) => {
			const getData = this.getLotData(val);

			return getData.is_available == 1;
		});

		return available;
	};

	setAvailabilityLot = (lot, lotData, is_available) => {
		fs.writeFileSync(
			`./textDatabase/lots/${lot}`,
			JSON.stringify({ ...lotData, is_available })
		);
	};
}

module.exports = Lot;
