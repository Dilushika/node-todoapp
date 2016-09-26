var mongoose = require("mongoose");
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');
var should = chai.should();

chai.use(chaiHttp);


describe('Todos', function() {

  it('should list all todos on /mytodos GET',function(done){
  	chai.request(server)
	  	.get('/mytodos')
	    .end(function(err, res){
	     res.should.have.status(200);
	     done();
  });

});

});