const UserModel = require("../models/User");
const {v4: uuidv4} = require("uuid")

const getTasks = async (req,res) => {
    try {
        const {username} = req.body;
        const foundUser = await UserModel.findOne({username});
        if(!foundUser){
            return res.status(404).json({message: "User not found"});
        }
        console.log(foundUser);
        res.status(200).json(foundUser);
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Server error"});
    }
}

const createTasks = async (req, res) => {
  try {
    const { title, status = false, username } = req.body;

    if (!title || !username) {
      return res.status(400).json({ message: "Task title and username are required" });
    }

    const newTask = {
      id: uuidv4(),
      title,
      status,
      createdAt: new Date(),
    };

    console.log(newTask);

    const updatedUser = await UserModel.findOneAndUpdate(
      { username },
      { $push: { tasks: newTask } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Cannot find user to add task" });
    }

    res.status(201).json({ tasks: updatedUser.tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateTasks = async (req,res) => {
    try {
        const { id, status } = req.body; 
    
        const result = await UserModel.updateOne(
          { "tasks.id": id },  
          { $set: { "tasks.$.status": status } } 
        );
    
        if (result.modifiedCount > 0) {
          return res.status(200).json({ message: 'Task status updated successfully' });
        } else {
          return res.status(404).json({ message: 'Task not found or already up-to-date' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
}

const deleteTasks = async (req,res) => {
  try {
    const {id} = req.body;
    const result = await UserModel.updateOne(
      { "tasks.id": id }, 
      { $pull: { tasks: { id: id } } } 
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "Task not found or already deleted" });
    }
    res.status(200).json({message: "Task deleted successfully"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = {getTasks, updateTasks, createTasks,deleteTasks}