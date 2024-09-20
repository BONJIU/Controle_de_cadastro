const Sequelize = require("sequelize")
const sequelize = new Sequelize("aula7_atualizar", "root", "",{
    host: "localhost",
    dialect: "mysql"
})


module.exports = {
    Sequelize,
    sequelize
}