// Address book for registered user
module.exports = function (sequelize, DataTypes) {
  var Addressbook = sequelize.define("Addressbook", {
    recipient_name: {
      type: DataTypes.STRING
    },
    recipient_address1: {
      type: DataTypes.STRING
    },
    recipient_address2: {
      type: DataTypes.STRING
    },
    recipient_city: {
      type: DataTypes.STRING
    },
    recipient_state: {
      type: DataTypes.STRING
    },
    recipient_zip: {
      type: DataTypes.STRING
    }
  }, {
      // timestamps: false,
      freezeTableName: true,
    });

  Addressbook.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Addressbook.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Addressbook;
};
