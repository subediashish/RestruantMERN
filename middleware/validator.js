const { check, validationResult } = require("express-validator");

exports.signupValidator = [
  check("username").not().isEmpty().trim().withMessage("All fields required"),

  check("email").isEmail().normalizeEmail().withMessage("Invalid Email"),

  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

exports.validatorResult = (req, res, next) => {
  const result = validationResult(req);
  const hasErrors = !result.isEmpty();
  if (hasErrors) {
    console.log("has Errors ", hasErrors);
    console.log;
    offscreenBuffering("result", result);
  }
  next();
};
