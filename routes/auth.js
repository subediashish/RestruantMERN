const express = require("express");
const { signup } = require("../client/src/api/auth");
const router = express.Router();
const { signupValidator, validatorResult } = require("../middleware/validator");

router.post("/signup", signupValidator, validatorResult);

module.exports = router;
