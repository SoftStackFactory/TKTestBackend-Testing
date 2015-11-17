var should = require('chai').should(),
    supertest = require('supertest'),
    api = supertest("http://0.0.0.0:"+ process.env.PORT + "/api/");

var authToken;
var userID;
var testUserEmail = "and24@ssf.com";
var testUserFirstName = "Andres";
var testUserLastName = "Agular";
var testUserPassword = "123";

describe('SSFUsers', function() {
  
  it('errors new SSFUser creation for no parameters', function(done) {
    api.post('SSFUsers')
    .expect(422, done);
  });

  it('errors new SSFUser for invalid email', function(done) {
    api.post('SSFUsers')
    .expect(422)
    .send({ email: 'and10ssf.com', password: '123' })
    .end(function(err,res) {
        if(err) return done(err);
      
        done();
    });
  });
  
  it('errors new SSFUser for no password', function(done) {
    api.post('SSFUsers')
    .expect(422)
    .send({ email: 'and10@ssf.com'})
    .end(function(err,res) {
        if(err) return done(err);
        done();
        });
    });

  it('successfully creates user', function(done) {
    api.post('SSFUsers')
    .send({ email: testUserEmail, password: testUserPassword, firstName: testUserFirstName, lastName: testUserLastName })
    .expect(200,done);
  });
  
  it('successfully logins user', function(done) {
    api.post('SSFUsers/login')
    .expect(200)
    .send({ email: testUserEmail, password: testUserPassword })
    .end(function (err, res) {
      if(err) return done(err);
      authToken = res.body.id;
      userID = res.body.userId;
      done();
    });
  });
  
});

describe('Questions', function() {

  it('errors if wrong authorization token', function(done) {
    api.get('Questions')
    .set('Authorization', '123myToken')
    .expect(401, done);
  });

  it('errors if no Authorization header', function(done) {
    api.get('Questions')
    .expect(401)
    .end(function(err,res) {
      if(err) return done(err);
      res.body.error.should.have.property("message").and.to.equal("Authorization Required");
      
      done();
    });
  });

  it('returns list of Questions', function(done) {
    api.get('Questions')
    .set('Authorization', authToken)
    .expect(200)
    .end(function(err,res) {
      if(err) return done(err);

      res.body.should.have.length(60);
      done();
    });
  });
});

describe('Wrap up', function() {
  
  it('successfully deletes test user', function(done) {
    api.delete('SSFUsers/'+ userID)
    .set('Authorization', authToken)
    .expect(204, done);
  });
});
