const express = require("express");
const router = express.Router();
const {getTasks,createTasks, updateTasks, deleteTasks} = require("../controllers/taskController");

router.post("/", getTasks);
router.post("/:username", createTasks);
router.put("/", updateTasks);
router.delete("/", deleteTasks);

module.exports = router