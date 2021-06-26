const Vehicle = require("./Vehicle");

class NewVehicle extends Vehicle {
	constructor(plat_nomor, warna, tipe, enterParkingLot) {
		super(enterParkingLot);
		this.plat_nomor = plat_nomor;
		this.warna = warna;
		this.tipe = tipe;
	}
}

module.exports = NewVehicle;
