const test = require('supertest');
const app = require("../app");
const expect = require("chai").expect;
var productInfo = {}

describe("Test Product Module", () => {
    it("Should_Pass_IfValidInformationPassedProductListing", (done) => {
        test(app)
        .get("/fetchProducts")
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
            productInfo = data.data.data[0]
            expect(res.status).to.be.equal(200);
            expect(data.data.count).to.be.equal(12);
            expect(data.data.userInfo[0].amount).to.be.equal(1000023);
            return done();
        });
    });

    it("Should_Fail_IfLessAmountPassed", (done) => {
        test(app)
        .post("/placeOrder")
        .set("Accept", "application/json")
        .set("Content-Type", "application/json")
        .set("first_name", "test")
        .set("last_name", "user")
        .send({
            data: productInfo.Id,
            amount: productInfo.price - 2
        })
        .expect(422)
        .expect("Content-Type", 'application/json; charset=utf-8')
        .end((err, res) => {
            if (err) {
                return done(err);
            }
            let data = JSON.parse(res.text)
            expect(res.status).to.be.equal(422);
            expect(data.message).to.be.equal("Currency entered should be more than to equal to the price of product");
            return done();
        });
    });

    it("Should_Pass_IfSameAmountPassed", (done) => {
        test(app)
        .post("/placeOrder")
        .set("Accept", "application/json")
        .set("Content-Type", "application/json")
        .set("first_name", "test")
        .set("last_name", "user")
        .send({
            data: productInfo.Id,
            amount: productInfo.price
        })
        .expect(200)
        .expect("Content-Type", 'application/json; charset=utf-8')
        .end((err, res) => {
            if (err) {
                return done(err);
            }
            let data = JSON.parse(res.text)
            expect(res.status).to.be.equal(200);
            expect(data.message).to.be.equal(`Order has been successfully placed for ${productInfo.productName}.`);
            return done();
        });
    });

    it("Should_Pass_IfMoreAmountPassed", (done) => {
        test(app)
        .post("/placeOrder")
        .set("Accept", "application/json")
        .set("Content-Type", "application/json")
        .set("first_name", "test")
        .set("last_name", "user")
        .send({
            data: productInfo.Id,
            amount: productInfo.price + 2
        })
        .expect(200)
        .expect("Content-Type", 'application/json; charset=utf-8')
        .end((err, res) => {
            if (err) {
                return done(err);
            }
            let data = JSON.parse(res.text)
            expect(res.status).to.be.equal(200);
            expect(data.message).to.be.equal(`Order has been successfully placed for ${productInfo.productName}. Also, here is your change of Rs. 2 (Don't worry! Credited to your account)`);
            return done();
        });
    });
});
     
