const express = require('express');
const { createNotes, getAllNotes, getNoteById, updateNotes, deleteNotes } = require('../controller/notesController');
const { userAuth } = require('../middleware/userAuth');

const router = express.Router();

router.post("/create",userAuth,createNotes);
router.get("/get",userAuth,getAllNotes);
router.get("/get/:id",userAuth,getNoteById);
router.put("/update/:id",userAuth,updateNotes);
router.delete("/delete/:id",userAuth,deleteNotes);


module.exports = router