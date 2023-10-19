import request from "supertest";
import app from "../app.js";
import { expect } from "chai";

describe("Pet rename API Test", function () {
  it("should return 200 status when all fields are valid", function (done) {
    request(app)
      .post("/petName")
      .send({
        id: "652f263396042f44ee66681f",
        petName: "Stanley",
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.equal("Pet name updated succesfully!");
        done();
      });
  });

  it("should return 400 status when the new name is same as old name", function (done) {
    request(app)
      .post("/petName")
      .send({
        id: "652f263396042f44ee66681f",
        petName: "Stanley",
      })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.equal("New name matches old name!");
        done();
      });
  });

  it("should return 400 status when the pet name field is empty", function (done) {
    request(app)
      .post("/petName")
      .send({
        id: "652f263396042f44ee66681f",
        petName: "",
      })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.message).to.equal("petName is a required field");
        done();
      });
  });
});
