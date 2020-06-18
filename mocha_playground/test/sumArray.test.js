const expect = require('chai').expect;
const sum = require('../sumArray');

describe('Array sum', () => {
  it('should return a promise', () => {
    expect(sum([1,2,3])).to.be.a('promise');
  });
});

//So far so good, the test passes because the return value from the function is a Promise. 
//To test that the promise resolves a correct value we have to add a .then handler.
// We can add a test for the normal case like this:

it('should sum an array of numbers', () => {
    return sum([1,2,3])
      .then(ans => {
        expect(ans).to.equal(6);
      });
  });

  it('should sum an array of numbers and numeric strings', () => {
    return sum([1,'2',3])
      .then(ans => {
        expect(ans).to.equal(6);
      });
  });

  //Now we get a failure as expected.

//AssertionError: expected '123' to equal 6

it('should sum an array of numbers and non-numeric strings', () => {
    return sum([1,'2',3, 'a'])
      .then(ans => {

      expect(ans).to.be.a('number').that.equal(6);
      });
  });