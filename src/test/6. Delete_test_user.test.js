const test = require('supertest');
const app = require("../app");
const expect = require("chai").expect;

describe("Delete test user", () => {
    it("Should_Pass_IfValidInformationPassedUserDeletion", (done) => {
        test(app)
        .get("/test-removeUserData")
        .set("Accept", "application/json")
        .set("Content-Type", "application/json")
        .set("first_name", "test")
        .set("last_name", "user")
        .expect(200)
        .expect("Content-Type", 'text/html; charset=utf-8')
        .end((err, res) => {
            if (err) {
                return done(err);
            }
            expect(res.status).to.be.equal(200);
            expect(res.text).to.be.equal('User deleted successfully!');
            return done();
        });
    });
});
     
