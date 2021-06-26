const { Fee, Lot, NewVehicle, Time, Vehicle } = require("../class");

const time = new Time();
const lot = new Lot();
const fee = new Fee();
const vehicle = new Vehicle();

const enterParking = (req, res) => {
	let { plat_nomor, warna, tipe } = req.body;

	if (
		!(plat_nomor && warna && tipe) ||
		!(
			typeof plat_nomor === typeof "" &&
			typeof warna === typeof "" &&
			typeof tipe === typeof ""
		)
	) {
		return res.status(200).send({
			message: "Request body salah atau kurang",
		});
	}

	plat_nomor = plat_nomor.toLocaleUpperCase().split(" ").join("");

	try {
		// Availability Lot Checking
		const availableLot = lot.getAvailableLot();

		if (!availableLot) {
			return res.status(200).send({
				message: "Parkir Penuh",
			});
		}

		// isVehicleParked?
		const isVehicleParked = vehicle.checkParkedVehicle(plat_nomor);

		if (isVehicleParked) {
			return res.status(200).send({
				message: "Mobil sudah terparkir",
			});
		}

		// isTypeAllowed?
		const isTypeAllowed = vehicle.checkVehicleType(tipe);

		if (!isTypeAllowed) {
			return res.status(200).send({
				message: "Masukkan Tipe Mobil SUV atau MPV",
			});
		}

		// Enter Parking Lot
		const newVehicle = new NewVehicle(plat_nomor, warna, tipe);
		const enterParkingLot = newVehicle.enterParkingLot(availableLot);

		// Response
		const response = {
			plat_nomor: enterParkingLot.plat_nomor,
			parking_lot: enterParkingLot.parking_lot,
			tanggal_masuk: new Date(enterParkingLot.time).toLocaleString(),
		};

		res.status(200).send(response);
	} catch (err) {
		console.log(err);
		res.status(500).send(err.message);
	}
};

const exitParking = (req, res) => {
	let { plat_nomor } = req.body;

	if (!plat_nomor || !(typeof plat_nomor === typeof "")) {
		return res.status(200).send({
			message: "Request body salah atau kurang",
		});
	}

	plat_nomor = plat_nomor.toLocaleUpperCase().split(" ").join("");

	try {
		// isVehicleParked?
		const isVehicleParked = vehicle.checkParkedVehicle(plat_nomor);

		if (!isVehicleParked) {
			return res.status(200).send({
				message: "Mobil Tidak Ada",
			});
		}

		// Get "plat_nomor" Vehicle Data
		const vehicleData = vehicle.getParkedVehicleData(`${plat_nomor}.txt`);

		// Get Parking Fee
		const { first_hour_fee: firstHourFee } = fee.getFirstHourFee(
			vehicleData.tipe
		);

		const enterTime = vehicleData.time;
		const exitTime = time.getCurrentTime();

		const parkingFee = fee.getParkingFee(enterTime, exitTime, firstHourFee);

		// Exit Parking Lot
		vehicle.exitParkingLot(vehicleData.parking_lot, vehicleData.plat_nomor);

		// Response
		const response = {
			plat_nomor: vehicleData.plat_nomor,
			tanggal_masuk: new Date(enterTime).toLocaleString(),
			tanggal_keluar: new Date(exitTime).toLocaleString(),
			jumlah_bayar: parkingFee,
		};

		res.status(200).send(response);
	} catch (err) {
		console.log(err);
		res.status(500).send(err.message);
	}
};

const getTotalByType = (req, res) => {
	const { tipe } = req.body;

	if (!tipe || !(typeof tipe === typeof "")) {
		return res.status(200).send({
			message: "Request body salah atau kurang",
		});
	}

	try {
		// Filter Vehicles By Type
		const filteredVehicles = vehicle.filterVehicleByType(tipe);

		// Response
		const response = {
			jumlah_kendaraan: filteredVehicles.length,
		};

		res.status(200).send(response);
	} catch (err) {
		console.log(err);
		res.status(500).send(err.message);
	}
};

const getListByColor = (req, res) => {
	const { warna } = req.body;

	if (!warna) {
		return res.status(200).send({
			message: "Request body salah atau kurang",
		});
	}

	try {
		// Filter Vehicles By Color
		const filteredVehicles = vehicle.filterVehicleByColor(warna);

		// Response
		const response = {
			plat_nomor: filteredVehicles,
		};

		res.status(200).send(response);
	} catch (err) {
		console.log(err);
		res.status(500).send(err.message);
	}
};

module.exports = {
	enterParking,
	exitParking,
	getTotalByType,
	getListByColor,
};
