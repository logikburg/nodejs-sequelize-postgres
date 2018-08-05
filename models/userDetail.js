var validate = require('validator');

module.exports = (sequelize, type) => {
    return sequelize.define('userDetail', {
        dob: type.DATEONLY,
        firstname: {
          type: type.STRING,
          validate: {
                  len: {
                      args: 3,
                      msg: "First Name must be atleast 3 characters in length"
                  }
              }
        },
        lastname: {
          type: type.STRING,
          validate: {
                  len: {
                      args: 1,
                      msg: "last Name must be atleast 1 character in length"
                  }
              }
        },
        policycode: {
          type: type.STRING(8),
          validate: {
                len: {
                    args: 8,
                    msg: "First Name must be atleast 8 characters in length"
                }
              }
        },
        geneticresult: {
          type: type.JSON,
          allowNull: true
        }
    })
}
