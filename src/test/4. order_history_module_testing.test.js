const test = require('supertest');
const app = require("../app");
const expect = require("chai").expect;
var orderInfo = {}
var userAmount = 0
var productInfo = {}

describe("Order History Module", () => {
    it("Should_Pass_IfValidOrderListing", (done) => {
        test(app)
        .get("/fetchOrders")
        .set("Accept", "application/json")
        .set("Content-Type", "application/json")
        .set("first_name", "test")
        .set("last_name", "user")
        .expect(200)
        .expect("Content-Type", 'application/json; charset=utf-8')
        .end((err, res) => {
            if (err) {
                return done(err);
            }
            let data = JSON.parse(res.text)
            orderInfo = data.data.data[0]
            userAmount = data.data.userInfo[0].amount
            productInfo = orderInfo.productId
            expect(res.status).to.be.equal(200);
            expect(data.data.data.length).to.be.equal(2);
            expect(orderInfo.isCancel).to.be.equal('N');
            return done();
        });
    });
    
    it("Should_Pass_IfValidRefundProcessed", (done) => {
        test(app)
        .post("/processRefund")
        .set("Accept", "application/json")
        .set("Content-Type", "application/json")
        .set("first_name", "test")
        .set("last_name", "user")
        .send({
            data: orderInfo.Id
        })
        .expect(200)
        .expect("Content-Type", 'application/json; charset=utf-8')
        .end((err, res) => {
            if (err) {
                return done(err);
            }
            let data = JSON.parse(res.text)
            expect(res.status).to.be.equal(200);
            expect(data.message).to.be.equal(`Refund request has been processed for product ${productInfo.product_name}.`);
            return done();
        });
    });

    it("Should_Pass_IfValidRefundStatus", (done) => {
        test(app)
        .get("/fetchOrders")
        .set("Accept", "application/json")
        .set("Content-Type", "application/json")
        .set("first_name", "test")
        .set("last_name", "user")
        .expect(200)
        .expect("Content-Type", 'application/json; charset=utf-8')
        .end((err, res) => {
            if (err) {
                return done(err);
            }
            let data = JSON.parse(res.text)
            orderInfo = data.data.data[0]
            expect(res.status).to.be.equal(200);
            expect(data.data.data.length).to.be.equal(2);
            expect(data.data.userInfo[0].amount).to.be.equal(userAmount + productInfo.price);
            expect(orderInfo.isCancel).to.be.equal('Y');
            return done();
        });
    });
});
     
