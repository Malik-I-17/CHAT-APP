const { DataTypes } = require('sequelize');
const sequelize = require('../config/sql');

const Message = sequelize.define('Message', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    senderId: { type: DataTypes.UUID, allowNull: false },
    content: { type: DataTypes.STRING, allowNull: false }
}, { timestamps: true });
module.exports = Message;