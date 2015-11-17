var should = require('chai').should(),
    supertest = require('supertest'),
    api = supertest("http://0.0.0.0:"+ process.env.PORT + "/api/");

describe('Questions', function() {

  var authToken;
  before(function() {
    // runs before all tests in this block
    
    api.post('SSFUsers/login')
    .send({ email: 'and19@ssf.com', password: '123' })
    .end(function (err, res) {
      console.log(res.body);
      if(err) return;
      authToken = res.body.id;
      console.log("questions "+authToken);
    });
  });
  
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
