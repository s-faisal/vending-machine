const test = require('supertest');
const app = require("../app");
const expect = require("chai").expect;

describe("Load Data of product and users for getting app started", () => {
    it("Should_Pass_IfValidDataLoaded", (done) => {
        test(app)
        .get("/loadData")
        .set("Accept", "application/json")
        .set("Content-Type", "application/json")
        .expect(200)
        .expect("Content-Type", 'application/json; charset=utf-8')
        .end((err, res) => {
            if (err) {
                return done(err);
            }
            expect(res.status).to.be.equal(200);
            return done();
        });
    });
});
     
