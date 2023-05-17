const db = require('../util/db_con.js');

module.exports = class Product {
  constructor(id,title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }
  save() {
    return db.execute('INSERT INTO products (title,price,description,imageURL) VALUES (?, ?, ?, ?)',[this.title,this.price,this.description,this.imageUrl])
  }

  static fetchAll() {
    return db.execute('SELECT * FROM products');
  }
  static findById(id){
    return db.execute('SELECT * FROM products WHERE products.id= ?',[id])
  }
  static deleteById(id) {
    return db.execute('DELETE FROM products WHERE products.id=?',[id])
  }
};
