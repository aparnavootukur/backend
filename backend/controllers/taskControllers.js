const Task = require("../models/Task");
const { validateObjectId } = require("../utils/validation");


exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({where:{ assigneeId: req.user.id }});
    res.status(200).json({ tasks, status: true, msg: "Tasks found successfully.." });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}

exports.getTask = async (req, res) => {
  try {
    console.log(req.params.id,'req')
    const task = await Task.findOne({where:{ assigneeId: req.user.id, id: req.params.id }});
    console.log(task,'ii')
    if (!task) {
      return res.status(400).json({ status: false, msg: "No task found.." });
    }
    res.status(200).json({ task, status: true, msg: "Task found successfully.." });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}

exports.postTask = async (req, res) => {
  try {
    const { description ,status,title,dueDate,category} = req.body;
    const existtask = await Task.findOne({where:{ title:req.body.title ,assigneeId:req.user.id}});
    if (existtask) {
      return res.status(400).json({ status: false, msg: "Title already exists" });
    }

    if (!description) {
      return res.status(400).json({ status: false, msg: "Description of task not found" });
    }
    const task = await Task.create({ assigneeId: req.user.id, description ,status,title,dueDate,category});
    res.status(200).json({ task, status: true, msg: "Task created successfully.." });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}

exports.putTask = async (req, res) => {
  try {
    const { id } = req.params;
  const { status } = req.body;
    if (!status) {
      return res.status(400).json({ status: false, msg: "update status" });
    }


    let task = await Task.findOne({where:{assigneeId:req.user.id,id:req.params.id}});
    if (!task) {
      return res.status(400).json({ status: false, msg: "Task with given id not found" });
    }

    if (task.assigneeId != req.user.id) {
      return res.status(403).json({ status: false, msg: "You can't update task of another user" });
    }

    task = await Task.update({ status }, {
      where:{id:req.params.id}
    });
    res.status(200).json({ task, status: true, msg: "Task updated successfully.." });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}


exports.deleteTask = async (req, res) => {
  try {
 

    let task = await Task.findOne({where:{assigneeId:req.user.id,id:req.params.taskId}});
    if (!task) {
      return res.status(400).json({ status: false, msg: "Task with given id not found" });
    }

    if (task.assigneeId!= req.user.id) {
      return res.status(403).json({ status: false, msg: "You can't delete task of another user" });
    }

    await Task.destroy({where:{id:req.params.taskId}});
    res.status(200).json({ status: true, msg: "Task deleted successfully.." });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}