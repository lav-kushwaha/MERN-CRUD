const express = require("express");
const {
  createNotes,
  getAllNotes,
  getNoteById,
  updateNotes,
  deleteNotes
} = require("../controller/notesController");

const { userAuth } = require("../middleware/userAuth");

const router = express.Router();
// router.use(userAuth);

router.post("/", userAuth, createNotes);
router.get("/", userAuth, getAllNotes);
router.get("/:id", userAuth, getNoteById);
router.put("/:id", userAuth, updateNotes);
router.delete("/:id", userAuth, deleteNotes);

module.exports = router;
