class Time {
	constructor() {}

	getCurrentTime = () => {
		return new Date().getTime();
	};

	getParkingTime = (masuk, keluar) => {
		return Math.ceil((keluar - masuk) / 3600000);
	};
}

module.exports = Time;
