const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");
const { v4: uuidv4 } = require("uuid");

const ForgotPasswordRequest = sequelize.define("forgotPasswordRequest", {
  id: {
    type: DataTypes.UUID,
    defaultValue: () => uuidv4(),
    allowNull: false,
    primaryKey: true,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = ForgotPasswordRequest;
