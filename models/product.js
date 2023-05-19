const Sequelize = require('sequelize');

const sequelize = require('../util/db_con.js');
const Product = sequelize.define('product',{
  id:{
    type:Sequelize.INTEGER,
    autoIncrement:true,
    allowNull: false,
    primaryKey: true
  },
  title: Sequelize.STRING,
  description:{
    type:Sequelize.STRING,
    allowNull:false
  },
  price:{
    type: Sequelize.DOUBLE,
    allowNUll: false
  },
  imageURL:{
    type:Sequelize.STRING,
    allowNUll:false
  }
})
module.exports = Product;