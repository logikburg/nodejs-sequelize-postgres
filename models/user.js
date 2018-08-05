var validate = require('validator');

module.exports = (sequelize, type) => {
    return sequelize.define('user', {
        id: {
          type: type.INTEGER,
          autoIncrement: true
        },
        username: {
            type: type.STRING(100),
            allowNull: false,
            primaryKey: true,
            validate: {
                len: {
                    args: 3,
                    msg: "userName must be atleast 3 characters in length"
                }
            }
        },
        password: {
            type: type.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: 5,
                    msg: "password must be atleast 5 characters in length"
                }
            }
        },
        email: {
          type: type.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true
          }
        },
        token: { type: type.STRING, allowNull: true },
        active: { type: type.BOOLEAN, allowNull: false, defaultValue: true }
    })
}
