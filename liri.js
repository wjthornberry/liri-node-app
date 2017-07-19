// NPM package for readinga and writing files
var fs = require('fs');

// Allows the app to use the information from keys.js, 
// where the Twitter API access keys are stored
var keys = require("./keys.js");

// NPM package to make http calls
var request = require('request');

// NPM package for the Twitter API
var twitter = require('twitter');

// NPM package for the Spotify API
var spotify = require('spotify');

// Open Movie Database (OMDb API)