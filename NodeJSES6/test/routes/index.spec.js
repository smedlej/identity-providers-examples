/* eslint-env mocha */

import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
const { expect } = chai;

describe('routes/index', () => {
  it('should get a status 404 if "/" is call', (done) => {
    chai.request('http://localhost:4000')
      .get('/')
      .end((err, res) => {
        expect(res.body.error).to.not.be.null;
        expect(res).to.have.status(404);
        done();
      });
  });

  it('should get a status 400 if "/authorize" is call with invalid query', (done) => {
    chai.request('http://localhost:4000')
      .get('/authorize')
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('should get a status 302 if "/authorize" is call with valid query', (done) => {
    // Setup
    chai.request('http://localhost:4000')
      .get('/authorize').redirects(0)
      .query({
        client_id: '9c771146e9ff7f45a7613ced4be01581b3abbd8e25d45fb3e45559b2577c5030',
        redirect_uri: 'http://localhost:3041/oidc_callback',
        response_type: 'code',
        scope: 'openid profile birth',
        state: '321',
        nonce: '123',
      })
      .end((err, res) => {
        expect(res).to.have.status(302);
        expect(res.redirect).to.have.equal(true);
        expect(res.redirects).to.be.empty;
        done();
      });
  });
});

