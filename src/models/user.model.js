const db = require('../utils/database');
const { DataTypes } = require('sequelize');

const Todos = db.define('todos', {
    
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title:{
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    description:{
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    completed:{
        type: DataTypes.STRING(15),
        allowNull: false,
    }
},);

module.exports = Todos;