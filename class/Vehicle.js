const fs = require("fs");
const Lot = require("./Lot");

class Vehicle extends Lot {
	constructor(getLots, getLotData, setAvailabilityLot) {
		super(getLots, getLotData, setAvailabilityLot);
	}

	getVehicleTypes = () => {
		return fs.readdirSync("./textDatabase/types");
	};

	checkVehicleType = (tipe) => {
		const vehicleTypes = this.getVehicleTypes();

		return vehicleTypes.includes(`${tipe.toLocaleUpperCase()}.txt`);
	};

	getParkedVehicles = () => {
		return fs.readdirSync("./textDatabase/vehicles");
	};

	getParkedVehicleData = (plat_nomor) => {
		return JSON.parse(fs.readFileSync(`./textDatabase/vehicles/${plat_nomor}`));
	};

	checkParkedVehicle = (plat_nomor) => {
		const vehicles = this.getParkedVehicles();

		return vehicles.includes(`${plat_nomor}.txt`);
	};

	filterVehicleByType = (tipe) => {
		const vehicles = this.getParkedVehicles();

		return vehicles.filter((val) => {
			const data = this.getParkedVehicleData(val);

			return data.tipe.toLocaleLowerCase() == tipe.toLocaleLowerCase();
		});
	};

	filterVehicleByColor = (warna) => {
		const vehicles = this.getParkedVehicles();

		// return vehicles.filter((val) => {
		// 	const data = this.getParkedVehicleData(val);

		// 	return data.warna.toLocaleLowerCase() == warna.toLocaleLowerCase();
		// });

		let filteredVehicles = vehicles.filter((val) => {
			const data = this.getParkedVehicleData(val);

			return data.warna.toLocaleLowerCase() == warna.toLocaleLowerCase();
		});

		filteredVehicles = filteredVehicles.map((val) => {
			return val.split(".txt")[0];
		});

		return filteredVehicles;
	};

	enterParkingLot = (availableLot) => {
		const lotData = this.getLotData(availableLot);

		const newVehicle = {
			plat_nomor: this.plat_nomor,
			warna: this.warna,
			tipe: this.tipe,
			parking_lot: lotData.lot_num,
			time: new Date().getTime(),
		};

		fs.writeFileSync(
			`./textDatabase/vehicles/${newVehicle.plat_nomor}.txt`,
			JSON.stringify(newVehicle)
		);

		this.setAvailabilityLot(availableLot, lotData, (this.is_available = 0));

		return newVehicle;
	};

	exitParkingLot = (parking_lot, plat_nomor) => {
		const lots = this.getLots();

		const vehicleLot = lots.find((val) => {
			return val == `${parking_lot}.txt`;
		});

		const lotData = this.getLotData(vehicleLot);

		this.setAvailabilityLot(vehicleLot, lotData, (this.is_available = 1));

		fs.unlinkSync(`./textDatabase/vehicles/${plat_nomor}.txt`);
	};
}

module.exports = Vehicle;
