// USER with Shipping Address
var bcrypt = require("bcrypt-nodejs");

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
            notEmpty: true
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
            notEmpty: true
        },
        username: {
            type: DataTypes.TEXT,
            // allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_login: {
            type: DataTypes.DATE
        },
        status: {
            type: DataTypes.ENUM('active', 'inactive'),
            defaultValue: 'active'
        },
        address1: {
            type: DataTypes.STRING,
        },
        address2: {
            type: DataTypes.STRING,
        },
        city: {
            type: DataTypes.STRING,
        },
        state: {
            type: DataTypes.STRING,
        },
        zip: {
            type: DataTypes.STRING,
        },
    }, {
            freezeTableName: true,
        });

    // Bcrypt setup is based from 15 - supplemental folder
    User.prototype.validPassword = function (password) {
        // BCRYPT is used to compare the password from the form field with the hashed version
        return bcrypt.compareSync(password, this.password);
    };

    // before the user is created the password is hashed
    User.hook("beforeCreate", function (user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    });

    // create one-to-many join with Addressbook and Order tables
    User.associate = function (models) {
        User.hasMany(models.Addressbook, {
            onDelete: "cascade"
        });
        User.hasMany(models.Order, {
            onDelete: "cascade"
        });
    };
    return User;

}