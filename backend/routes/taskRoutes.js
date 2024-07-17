const express = require("express");
const router = express.Router();
const { getTasks, getTask, postTask, putTask, deleteTask } = require("../controllers/taskControllers");
const { verifyAccessToken } = require("../middlewares.js");

// Routes beginning with /api/tasks
router.get("/", verifyAccessToken, getTasks);
router.get("/:id", verifyAccessToken, getTask);
router.post("/", verifyAccessToken, postTask);
router.put("/:id", verifyAccessToken, putTask);
router.delete("/:taskId", verifyAccessToken, deleteTask);

module.exports = router;
