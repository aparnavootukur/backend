const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('pending', 'in-progress', 'completed'),
    defaultValue: 'pending'
  },
  dueDate:{
    type:DataTypes.DATE
  },
  category:{
    type:DataTypes.STRING
  }
});

Task.belongsTo(User, { as: 'assignee' });

module.exports = Task;
