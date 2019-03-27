// Orders for registered user
module.exports = function (sequelize, DataTypes) {
    var Order = sequelize.define("Order", {
      order: {
        type: DataTypes.INTEGER,
        allowNull: false,
        notEmpty: true
      },

    }, {
        // timestamps: false,
        freezeTableName: true,
      });
  
    Order.associate = function(models) {
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
  