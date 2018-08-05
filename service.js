const Sequelize = require('sequelize')
const UserModel = require('./models/user')
const UserDetailModel = require('./models/userDetail')

const sequelize = new Sequelize('temp', 'postgres', '', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

//const Customer = UserModel(sequelize, Sequelize)
const User = UserModel(sequelize, Sequelize)
const UserDetail = UserDetailModel(sequelize, Sequelize)
User.hasMany(UserDetail, {foreignKey: 'username'});


sequelize.sync({ force: false })
  .then(() => {
    console.log(`Database & tables created!`)
  })

module.exports = {
  User,
  UserDetail
}
