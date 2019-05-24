"use strict";
module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define("Contact", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  Contact.associate = models => {
    Contact.hasMany(models.Text, {
      foreignKey: "contactId",
      onDelete: "CASCADE"
    });
  };
  return Contact;
};
