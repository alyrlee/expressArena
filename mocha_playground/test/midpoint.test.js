const app = require('../app');
const expect = require('chai').expect;
const supertest = require('supertest');

describe('GET /midpoint endpoint', () => {
  it('should find midpoint between NY and LA', () => {
    const query = {
      lat1: 40.6976701, //NY
      lon1: -74.2598674, //NY
      lat2: 34.0207305, //LA
      lon2: -118.6919221 //LA
    };

    // somewhere near Aurora, Kansas
    const expected = {
      lat: 39.50597300917347,
      lon: -97.51789156106972
    };

    return supertest(app)
      .get('/midpoint')
      .query(query)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.have.all.keys('lat', 'lon');
        expect(res.body).to.eql(expected);
      });
  })

//   Write an endpoint handler function GET /frequency that accepts a String s. 
//Count the frequency of occurrence of each character in the String, the total number of distinct characters, the average frequency, 
//and the character with the highest frequency. Return an object in the format:

//   {
//     count: 2,
//     average: 5,
//     highest: 'a',
//     'a': 6,
//     'b': 4
//   }
app.get('/frequency', (req, res) => {
    const { s } = req.query;
  
    if (!s) {
      return res
        .status(400)
        .send('Invalid request');
    }
  
    const counts = s
      .toLowerCase()
      .split('')
      .reduce((acc, curr) => {
        if (acc[curr]) {
          acc[curr]++;
        } else {
          acc[curr] = 1;
        }
        return acc;
      }, {});
  
    const unique = Object.keys(counts).length;
    const average = s.length / unique;
    let highest = '';
    let highestVal = 0;
  
    Object.keys(counts).forEach(k => {
      if (counts[k] > highestVal) {
        highestVal = counts[k];
        highest = k;
      }
    });
  
    counts.unique = unique;
    counts.average = average;
    counts.highest = highest;
    res.json(counts);
  });


});