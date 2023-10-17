import request from 'supertest';
import { expect } from 'chai';
import app from "../app.js"

describe('API Endpoint Testing', () => {
  it('should add two numbers', (done) => {
    request(app)
      .get('/add')
      .query({ a: 5, b: 7 }) // Provide query parameters
      .expect(200) // Expecting a status code of 200
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.result).to.equal(12); // Assert the expected result
        done();
      });
  });

  it('should return an error for invalid input', (done) => {
    request(app)
      .get('/add')
      .query({ a: 'invalid', b: 7 }) // Invalid input
      .expect(400) // Expecting a status code of 400 for a bad request
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.error).to.exist; // Assert that an error message exists
        done();
      });
  });
});
