const express = require("express");
const router = express.Router();

const flairController = require("../controllers/flairController");

router.get("/topics/:topicId/flairs/new", flairController.new);
router.post("/topics/:topicId/flairs/create", flairController.create);
router.get("/topics/:topicId/flairs/:id", flairController.show);

module.exports = router;