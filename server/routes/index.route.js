const router = require("express").Router();

router.use("/api/auth",require("../app/auth/routes"));
router.use("/api/faculty", require("../app/faculty/routes"));
router.use("/api/faculty-major", require("../app/faculty-major/routes"));
router.use("/api/assessment", require("../app/assessment/routes"));

module.exports = router;