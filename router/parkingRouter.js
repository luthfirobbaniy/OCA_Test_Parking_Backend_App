const express = require("express");
const {
	enterParking,
	exitParking,
	getTotalByType,
	getListByColor,
} = require("../controller");

const router = express.Router();

router.post("/enter", enterParking);
router.post("/exit", exitParking);
router.post("/total-by-type", getTotalByType);
router.post("/list-by-color", getListByColor);

module.exports = router;
