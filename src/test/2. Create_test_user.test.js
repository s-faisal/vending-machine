const test = require('supertest');
const app = require("../app");
const expect = require("chai").expect;

describe("Create user for testing Application", () => {
    it("Should_Pass_IfValidInformationPassedUserCreation", (done) => {
        test(app)
        .get("/test-loadData")
        .set("Accept", "application/json")
        .set("Content-Type", "application/json")
        .expect(200)
        .expect("Content-Type", 'text/html; charset=utf-8')
        .end((err, res) => {
            if (err) {
                return done(err);
            }
            expect(res.status).to.be.equal(200);
            expect(res.text).to.be.equal('Data inserted successfully');
            return done();
        });
    });
});