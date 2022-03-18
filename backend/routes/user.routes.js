const express = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middleware/validateFiels");
const router = express.Router();
const user = require("../controllers/user.controller");

router.get("/", user.getUsers);
router.post("/", user.addUser);
router.get("/users-filtered", user.filterUsersBySexAndStatus);
router.get(
  "/:id",
  [check("id", "Is not a valid ID").isMongoId(), validateFields],
  user.getUserDetails
);
router.put(
  "/:id",
  [check("id", "Is not a valid ID").isMongoId(), validateFields],
  user.editUser
);
router.delete(
  "/:id",
  [check("id", "Is not a valid ID").isMongoId(), validateFields],
  user.deleteUser
);
router.post(
  "/sign-in",
  [
    check("email").not().isEmpty().withMessage("Email is required"),
    check("password").not().isEmpty().withMessage("Password is required"),
    validateFields,
  ],
  user.loginUser
);

module.exports = router;
