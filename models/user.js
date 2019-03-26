// USER with Shipping Address
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
            type: DataTypes.TEXT
        },
        about: {
            type: DataTypes.TEXT
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

    User.associate = function (models) {
        // Associating Author with Posts
        // When an Author is deleted, also delete any associated Posts
        User.hasMany(models.Addressbook, {
            onDelete: "cascade"
        });
    };
    return User;

}