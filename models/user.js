// USER with Shipping Address
var bcrypt = require("bcrypt-nodejs");

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
        // ID IS ALREADY ADDED IN SEQUELIZE
        // id: {
        //     autoIncrement: true,
        //     primaryKey: true,
        //     type: DataTypes.INTEGER
        // },
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
            // timestamps: false,
            freezeTableName: true,
        });

    // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
    User.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };

    // Hooks are automatic methods that run during various phases of the User Model lifecycle
    // In this case, before a User is created, we will automatically hash their password
    User.hook("beforeCreate", function (user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    });

    User.associate = function (models) {
        // Associating Author with Posts
        // When an Author is deleted, also delete any associated Posts
        User.hasMany(models.Addressbook, {
            onDelete: "cascade"
        });
    };
    return User;

}