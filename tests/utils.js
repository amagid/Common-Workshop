const mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

const config = require('../config').get();

chai.use(chaiHttp);

const request = function(route) {
    return chai.request(config.testing.baseUrl + (route || ''));
};

const unimplemented = function(done) {
    return Promise.resolve().then(() => { chai.expect.fail("Unimplemented") }).finally(done);
};

module.exports = {
    request,
    unimplemented
};