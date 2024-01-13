const express = require("express");
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
} = require("../controller/bootcamps");

const router = express.Router();

// Method 1
// router.get("/", getBootcamps);
// router.get("/:id", getBootcamp);
// router.post("/", createBootcamp);
// router.put("/:id", updateBootcamp);
// router.delete("/:id", deleteBootcamp);

// Method 2
// router.get("/", getBootcamps).post("/", createBootcamp);
// router
//   .get("/:id", getBootcamp)
//   .put("/:id", updateBootcamp)
//   .delete("/:id", deleteBootcamp);

// Method 3
router.route("/").get(getBootcamps).post(createBootcamp);
router
  .route("/:id")
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

module.exports = router;
