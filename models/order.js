// Orders for registered user
module.exports = function (sequelize, DataTypes) {
  var Order = sequelize.define("Order", {
    card_id: {
      type: DataTypes.STRING,
    },
    card_type: {
      type: DataTypes.STRING,
    },
    font: {
      type: DataTypes.STRING,
    },
    font_label: {
      type: DataTypes.STRING,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
      notEmpty: true
    },
    sender_name: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true
    },
    sender_address1: {
      type: DataTypes.STRING,
    },
    sender_address2: {
      type: DataTypes.STRING,
    },
    sender_city: {
      type: DataTypes.STRING,
    },
    sender_state: {
      type: DataTypes.STRING,
    },
    sender_zip: {
      type: DataTypes.STRING,
    },
    recipient_name: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true
    },
    recipient_business_name: {
      type: DataTypes.STRING,
    },
    recipient_address1: {
      type: DataTypes.STRING,
    },
    recipient_address2: {
      type: DataTypes.STRING,
    },
    recipient_city: {
      type: DataTypes.STRING,
    },
    recipient_state: {
      type: DataTypes.STRING,
    },
    recipient_zip: {
      type: DataTypes.STRING,
    },
    order_processed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }

  }, {
      // timestamps: false,
      freezeTableName: true,
    });

  Order.associate = function (models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Order.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Order;
};
