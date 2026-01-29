const Notes = require("../model/notes");

//add
const createNotes = async(req,res)=>{
    try{
        const {title,content} = req.body;
        if(!title || !content){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            });
        }

        const note = new Notes({
            title,
            content,
            user:req.user._id, //set by userAuth middleware
        })

        await note.save();
        res.status(201).json({
            success:true,
            message:"Note created successfully!",
            data:note
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"Internal server error: " + error.message,
        })
    }
};

//Get all notes for the logged-in user
const getAllNotes = async(req,res)=>{
    try {
        const notes = await Notes.find({user:req.user._id})
        .populate("user", "userName email")

        res.status(200).json({
            success:true,
            data:notes,
        });

    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Internal server error:" + error.message
        })
    }
}

//Get a single note by ID (belongs to logged-in user)
const getNoteById = async(req,res)=>{
    try {
        const {id} = req.params;

        const note = await Notes.findOne({_id:id,user:req.user._id})
        .populate("user","userName email");

        if(!note){
            return res.status(404).json({
                success:false,
                message:"Note not found"
            });
        }

        res.status(200).json({
            success:true,
            data:note
        });

    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Internal server error:" + error.message
        })
    }
}

//update a note (only by the owner)
const updateNotes = async(req,res)=>{
    try {
        const {id} = req.params;
        const {title,content} = req.body;

        const updatedNote = await Notes.findOneAndUpdate(
            {_id:id,user:req.user._id},
            {title,content},
            {new:true}
        );

        if(!updatedNote){
            return res.status(404).json({
                success:false,
                message:"Note not found or unauthorized"
            })
        }

        res.status(200).json({
            success:true,
            message:"Note updated successfully.",
            data:updatedNote
        });

    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Internal server error: " + error.message,
        })
    }
}

//delete notes
const deleteNotes = async(req,res)=>{
    try {
        const {id} = req.params;

        const deletedNote = await Notes.findByIdAndDelete({
            _id:id,
            user:req.user._id,
        });

        if(!deletedNote){
            return res.status(404).json({
                success:false,
                message:"Note not found or unauthorized."
            })
        }

        res.status(200).json({
            success:true,
            message:"Note deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Internal server error: " + error.message,
        });
    }
};

module.exports = {
    createNotes,
    getAllNotes,
    getNoteById,
    updateNotes,
    deleteNotes
}