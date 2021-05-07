const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connectToDatabase = require('./config/database');

app.use(express.static(__dirname + "/"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + "/views");
app.set('view engine', 'ejs');

const server = app.listen(4000, () => {
	console.log('Server is listening on port 4000');
});
connectToDatabase()

const productControllerObj = new (require("./controllers/product_controller.js").product_controller);
const orderHistoryControllerObj = new (require("./controllers/order_history_controller.js").order_history_controller);
const userControllerObj = new (require("./controllers/user_controller.js").user_controller);

app.get('/', (req, res)=>{
	res.render('index.ejs');
});
app.get('/loadData', productControllerObj.loadProductData, userControllerObj.loadUserData);
app.get('/fetchProducts', productControllerObj.getProducts);
app.post('/placeOrder', orderHistoryControllerObj.placeOrder);
app.get('/fetchOrders', orderHistoryControllerObj.getOrders);
app.post('/processRefund', orderHistoryControllerObj.processRefund);

//Testing routes (Loading / removing user data )
app.get('/test-loadData', userControllerObj.testLoadUserData)
app.get('/test-removeUserData', userControllerObj.testRemoveUserData)
app.get('/test-removeOrderData', orderHistoryControllerObj.testRemoveOrderData)

module.exports = server