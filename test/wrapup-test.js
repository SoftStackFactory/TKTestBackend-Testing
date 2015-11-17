var should = require('chai').should(),
    supertest = require('supertest'),
    api = supertest("http://0.0.0.0:"+ process.env.PORT + "/api/");

describe('Wrap up', function() {

  var authToken;
  var userID;
  before(function() {
    // runs before all tests in this block
    api.post('SSFUsers/login')
    .send({ email: 'and19@ssf.com', password: '123' })
    .end(function (err, res) {
   
      console.log(err);
      console.log(res.body);
      if(err) return;
      authToken = res.body.id;
      userID = res.body.userId;
      console.log("wrapup "+userID);
    });
  });
  
  it('successfully deletes test user', function(done) {
    api.delete('SSFUsers/'+ userID)
    .set('Authorization', authToken)
    .expect(200, done);
  });
});
