const router = require("express").Router();
const FacultyMajor = require("../business-logic/faculty-major");
const { body, validationResult } = require("express-validator");

router.get("/get-all", async (req, res) => {
  try {
    const response = await FacultyMajor.findAll();
    res.json(response);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.get("/get-where-faculty/:id", async(req, res) => {
  try {
    const response = await FacultyMajor.findByFacultyId(req.params.id);
    res.json(response);
  }catch(err) {
    res.status(500).json(err.message)
  }
})

router.get("/get-by-id/:id", async (req, res) => {
  try {
    const response = await FacultyMajor.findById(req.params.id);
    res.json(response);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.post("/create", body("name").notEmpty(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  try {
    const response = await FacultyMajor.create(req.body);
    res.json(response);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.put("/update/:id", body("name").notEmpty(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  try {
    const response = await FacultyMajor.updateById(req.body, req.params.id);
    res.json(response);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.delete("/destroy/:id", async (req, res) => {
  try {
    const response = await FacultyMajor.deleteById(req.params.id);
    res.json(response);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
