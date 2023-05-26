const path = require('path');
const sequelize = require('./util/db_con.js');
const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
// Model Imports

const Product = require('./models/product.js');
const User = require('./models/user.js');
const Cart = require('./models/cart.js')
const CartItem = require('./models/cart_items.js')
const Order = require('./models/order.js')
const OrderItem = require('./models/order_items.js')
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next) => {
    User.findByPk(1)
    .then(user=>{
        req.user = user;
        next();
    })
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User,{
    constraints: true,
    onDelete: 'CASCADE'
});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsToMany(Product,{through:CartItem});
Product.belongsToMany(Cart,{through:CartItem});
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product,{through:OrderItem});
sequelize
    // .sync({force: true})
    .sync()
    .then(result => {
        return User.findByPk(1)
    })
    .then(user =>{
        if (!user){
            return User.create({
                name:"Max",
                email:"test@email.com"
            }) 
        } else return user;
    })
    .then(user=>{
        return user.createCart();
    })
    .then(cart=>{
        app.listen(3000)
    })
    .catch(err => {
        console.log(err)
    })

