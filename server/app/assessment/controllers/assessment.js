const router = require("express").Router();
const query = require("../business-logic/assessment");
const { body, validationResult } = require("express-validator");

router.get("/get-all", async (req, res) => {
  try {
      const response = await query.getAll(req.user.roleId, req.user.id);
      res.json(response);
  } catch (err) {
    res.status(500).json(err.message);
  }
});


router.get("/get-by-faculty-major/:id", async (req, res) => {
  try {
    const response = await query.getByFacultyMajor(req.params.id, req.user.roleId, req.user.id);
    res.json(response);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.get("/get-by-id/:id", async (req, res) => {
  try {
    const response = await query.findById(req.params.id);
    res.json(response);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.post("/set-publish/:id", body("publish").notEmpty(), async (req, res) => {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
  try {
    const response = await query.setPublish(req.params.id, req.body.publish);
    res.json(response)
  }catch(err) {
    res.status(500).json(err.message);
  }
})

router.post(
  "/create",
  body("title").notEmpty(),
  body("sub_title").notEmpty(),
  body("conditions").notEmpty(),
  body("facultyMajorId").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    try {
      const response = await query.create(req.body, req.user.id);
      res.json(response);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }
);

router.put(
  "/update/:id",
  body("assessment").notEmpty(),
  body("conditions").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    try {
      const response = await query.update(req.body.assessment, req.body.conditions, req.params.id);
      res.json(response);
    }catch(err) {
      res.status(500).json(err.message)
    }
  }
);

router.delete("/delete/:id", async (req, res) => {
  try {
    const response = await query.destroy(req.params.id);
    res.json(response);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.post("/search-email/:id", body("email").notEmpty(), async (req, res) => {
  try {
    const response = await query.checkEmail(req.params.id, req.body.email);
    res.json(response);
  }catch(err) {
    res.status(500).json(err.message)
  }
})

router.post('/send-answer/:id', body("answer").notEmpty(), body("detail").notEmpty(), async (req, res) => {
  try {
    const response = await query.saveAnswer(req.body.answer, req.body.detail, req.params.id);
    res.json(response)
  }catch(err) {
    res.status(500).json(err.message)
  }
});

router.put('/send-recomend/:id', body("recomend").notEmpty(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  try {
    const response = await query.updateRecomend(req.body.recomend, req.params.id);
    res.json(response);
  }catch(err) {
    res.status(500).json(err.message);
  }
})

router.get('/home-info', async (req, res) => {
  try {
    const response = await query.homeInfo(req.user.roleId, req.user.id)
    res.json(response)
  }catch(err) {
    res.status(500).json(err.message);
  }
})

router.get('/report-by-id/:id', async (req, res) => {
  try {
    const response = await query.reportById(req.params.id);
    res.json(response)
  }catch(err) {
    res.status(500).json(err.message);
  }
})

module.exports = router;
