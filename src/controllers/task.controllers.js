import Task from "../models/task.model.js";

export const addTask = async (req, res) => {
    try{
        const {name, description, date} = req.body;
        const taskToAdd = new Task({
            name,
            description,
            date,
            user: req.user.id
        });
        const savedTask = await taskToAdd.save();
        res.json(savedTask);
    }catch(e){
        return res.status(500).json({ message: e.message});
    }
}

export const getTask = async (req, res) => {
    const task = await Task.findById(req.params.id).populate("user");
    if(!task) return res.status(404).json({ message: "Task not found"});
    res.json(task);
}

export const allTasks = async (req, res) => {
    const tasks = await Task.find({
        user: req.user.id
    }).populate("user");
    if(!tasks) return res.status(404).json({ message: "Tasks not found!"});
    res.json(tasks);
}

export const updateTask = async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if(!task) return res.status(404).json({ message: "Task not found!"});
    res.json(task);
}

export const deleteTask = async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id);
    if(!task) return res.status(404).json({ message: "Task not found!"});
    return res.sendStatus(204);
}
