import request from 'supertest';
import app from '../app.js';
import { expect } from 'chai';


describe('Sign-up Form API Test', function () {
  it('should return 200 status when all fields are valid', function (done) {
    request(app)
      .post('/sign-up')
      .send({
        name: 'John Doe',
        email: 'JOhnAmerica@gmail.com',
        password: 'P@ssw0rd123',
        age: 25,
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.equal('Registration successful');
        done();
      });
  });

  it('should return 400 status when the name field is empty', function (done) {
    request(app)
      .post('/sign-up')
      .send({
        name: '',
        email: 'john@example.com',
        password: 'P@ssw0rd',
        age: 25,
      })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.message).to.equal("name is a required field");
        done();
      });
  });

  it('should return 400 status when the email format is invalid', function (done) {
    request(app)
      .post('/sign-up')
      .send({
        name: 'John Doe',
        email: 'invalid-email',
        password: 'P@ssw0rd123',
        age: 25,
      })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.message).to.equal("email must be a valid email");
        done();
      });
  });

  it('should return 400 status when the password is weak', function (done) {
    request(app)
      .post('/sign-up')
      .send({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'weak',
        age: 25,
      })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.message).to.equal("password must contain at least 1 uppercase letter");
        done();
      });
  });

  it('should return 400 status when the age is not a number', function (done) {
    request(app)
      .post('/sign-up')
      .send({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'P@ssw0rd123',
        age: 'r',
      })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.message).to.equal("Age must be a number");
        done();
      });
  });

  it('should return 400 status when any field is missing', function (done) {
    request(app)
      .post('/sign-up')
      .send({
        email: 'john@example.com',
        password: 'P@ssw0rd123',
        age: 25,
      })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.message).to.equal("name is a required field");
        done();
      });
  });
});
