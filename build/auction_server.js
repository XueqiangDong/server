"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var ws_1 = require("ws");
var app = express();
var Product = /** @class */ (function () {
    function Product(id, title, price, rating, desc, categories) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.rating = rating;
        this.desc = desc;
        this.categories = categories;
    }
    return Product;
}());
exports.Product = Product;
var CommentProduct = /** @class */ (function () {
    function CommentProduct(id, productId, timesstamp, user, rating, content) {
        this.id = id;
        this.productId = productId;
        this.timesstamp = timesstamp;
        this.user = user;
        this.rating = rating;
        this.content = content;
    }
    return CommentProduct;
}());
exports.CommentProduct = CommentProduct;
var products = [
    new Product(1, '第1个商品', 1.99, 0, '吸尘器，清洗灰尘', ['电子产品', '装修家具']),
    new Product(2, '第2个商品', 2.99, 4.5, '吸尘器，清洗灰尘，好用', ['电子产品', '装修家具']),
    new Product(3, '第3个商品', 10.99, 3.5, '吸尘器，清洗灰尘', ['电子产品', '装修家具', '灌溉系统']),
    new Product(4, '第4个商品', 16.99, 1.5, '好用,清洗灰尘', ['电子产品', '装修家具']),
    new Product(5, '第5个商品', 41.99, 4.5, '吸尘器，清洗灰尘', ['电子产品', '装修家具']),
    new Product(6, '第6个商品', 441.99, 5, '吸尘器，清洗灰尘', ['电子产品', '装修家具'])
];
var comments = [
    new CommentProduct(1, 1, '2017-03-05', '张三', 5, '东西很好'),
    new CommentProduct(2, 1, '2016-03-05', '李四', 2, '一般'),
    new CommentProduct(3, 1, '2015-03-05', '王五', 3, '一般'),
    new CommentProduct(4, 2, '2018-03-05', '马六', 5, '东西超级好'),
    new CommentProduct(5, 1, '2017-09-05', '严琦', 1, '差'),
];
app.get('/', function (req, res) {
    res.send("Hello Express");
});
app.get('/api/products', function (req, res) {
    res.json(products);
});
app.get('/api/products/:id', function (req, res) {
    res.json(products.find(function (product) { return product.id == req.params.id; }));
});
app.get('/api/products/:id/comments', function (req, res) {
    res.json(comments.filter(function (comment) { return comment.productId == req.params.id; }));
});
var server = app.listen(8000, "localhost", function () {
    console.log("服务器已启动，地址是localhost:8000");
});
var wsServer = new ws_1.Server({ port: 8085 });
wsServer.on("connection", function (websocket) {
    websocket.send("这个消息是服务器主动推送的");
    websocket.on("message", function (message) {
        console.log("接收到消息" + message);
    });
});
// setInterval(() => {
//     if (wsServer.clients) {
//         wsServer.clients.forEach(client => {
//             client.send("这是定时推送的消息")
//         })
//     }
// }, 3000)
