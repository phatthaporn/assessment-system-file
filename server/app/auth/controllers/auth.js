const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const signIn = require("../business-logic/signIn");
const signUp = require("../business-logic/signUp");
const resetPassword = require("../business-logic/resetPassword");
const { Users, Roles } = require("../../../models/index.model");

router.post(
  "/sign-in",
  body("email").notEmpty(),
  body("password").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    try {
      const response = await signIn(req.body);
      res.json(response);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }
);

router.post(
  "/sign-up",
  body("firstname").notEmpty(),
  body("lastname").notEmpty(),
  body("email").notEmpty(),
  body("password").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    try {
      const response = await signUp(req.body);
      res.json(response);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }
);

router.post(
  "/reset-password",
  body("password").notEmpty(),
  body("oldPassword").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    try {
      const response = await resetPassword(
        req.body.password,
        req.body.oldPassword,
        req.user.id
      );
      res.json(response);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }
);

router.get("/get-unapprove", async (req, res) => {
  try {
    const response = await Users.findAll({
      order: [["createdAt", "DESC"]],
      attributes: ["id", "firstname", "lastname", "email", "status", "roleId"],
      include: {model: Roles}
    });
    res.json({ status: "success", result: response });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.post("/approve/:id", async (req, res) => {
  try {
    const response = await Users.update(
      { status: 1,roleId: req.body.roleId, approvedBy: req.user.email },
      { where: { id: req.params.id } }
    );
    res.json({ status: "success", result: response });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.post('/un-approve/:id', async (req, res) => {
  try {
    const response = await Users.destroy({where: {id: req.params.id}});
    res.json({ status: "success", result: response})
  }catch(err) {
    res.status(500).json(err.message);
  }
})

router.get('/get-roles', async (req, res) => {
  try {
    const result = await Roles.findAll({ orderBy: [['createdAt', "ASC"]]});
    res.json({ status: "success", result })
  }catch(err) {
    res.status(500).json(err.message);
  }
})

module.exports = router;
