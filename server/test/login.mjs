import request from "supertest";
import app from "../app.js";
import { expect } from "chai";

describe("Login API Test", function () {
  it("should return 200 status when all fields are valid", function (done) {
    request(app)
      .post("/login")
      .send({
        email: "tanya@home.com",
        password: "Qwerty@1234",
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.deep.equal({
          id: "652f263396042f44ee66681f",
          email: "tanya@home.com",
          name: "TanyaTest",
        });
        done();
      });
  });

  it("should return 400 status when the password field is empty", function (done) {
    request(app)
      .post("/login")
      .send({
        email: "tanya@home.com",
        password: "",
      })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.message).to.equal("password is a required field");
        done();
      });
  });

  it("should return 400 status when the email format is invalid", function (done) {
    request(app)
      .post("/login")
      .send({
        email: "invalid-email",
        password: "Qwerty@123",
      })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.message).to.equal("email must be a valid email");
        done();
      });
  });

  it("should return 400 status when the password is weak", function (done) {
    request(app)
      .post("/login")
      .send({
        email: "tanya@home.com",
        password: "timepass",
      })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.message).to.equal(
          "password must contain at least 1 uppercase letter"
        );
        done();
      });
  });
});
