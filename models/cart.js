const fs=require('fs')
const path=require('path')

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
  );
module.exports = class Cart {
    static addProduct(id,productPrice) {
        fs.readFile(p,(err,fileContent) => {
            let cart = { products:[],totalPrice:0}
            if (!err){
                cart = JSON.parse(fileContent);
            }
            //analyse cart => find existing prod.
            const existingId = cart.products.findIndex(prod=>
                prod.id===id);
            const existingProd = cart.products[existingId]
            let updatedProduct;
            //add new prod.
            if (existingProd){
                updatedProduct={ ...existingProd};
                updatedProduct.qty=updatedProduct.qty+1;
                cart.products = [...cart.products]
                cart.products[existingProductIndex] = updatedProduct
            }else{
                updatedProduct = {id:id,qty:1}
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice=cart.totalPrice+ +productPrice;
            fs.writeFile(p,JSON.stringify(cart),err =>{
                console.log(err);
            })
        })
    }
}