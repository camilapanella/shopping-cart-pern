const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "savedCart",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.JSON
      }
    },
    { timestamps: false }
  );
};