console.log('this is loaded');

// Twitter NPM 
const Twitter = require('twitter');

// Spotify NPM
const Spotify = require('node-spotify-api');

// new Twitter client for liri.js
var client = new Twitter({
  consumer_key: 'sB1Dti2DOlJyjVWwoHTfPVY1u',
  consumer_secret: '1mEgw1kh7Ig0nvvRDMcjAPgZZ9ffFQGTbtZlV1SIQd9UW2jawJ',
  access_token_key: '886725576026882050-CrqnyplfAg9vtrQtyH1wLnfUewQwXag',
  access_token_secret: 'LNZMjyapnWB0jlmUCvAkR0QG2My7llzn5kvuUxwKmpneP',
});

var spotify = new Spotify({
  consumer_key: 'c9d34ad9c1564802838cec8d2853b89a',
  consumer_secret: '1dcd1a31221a492488eddb249833648b', 
});

//export keys
module.exports.client = client;
module.exports.spotify = spotify;