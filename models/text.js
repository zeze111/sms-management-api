"use strict";
module.exports = (sequelize, DataTypes) => {
  const Text = sequelize.define("Text", {
    message: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    receiver: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  Text.associate = models => {
    Text.belongsTo(models.Contact, {
      foreignKey: "contactId",
      onDelete: "CASCADE"
    });
  };
  return Text;
};
