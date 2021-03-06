const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');

describe('Express App', () => {
  it('should return a message from GET /', () => {
    return supertest(app)
      .get('/')
      .expect(200, 'Hello Express!');
  });
});

it(`should return 400 if 'a' is missing`, () => {
      return supertest(app)
       .get('/playstore')
       .expect(200, 'Hello, world!');
    });
    });