// Import NPM packages

// Readinga and writing files
var fs = require('fs');

// Make http calls
var request = require('request');

// Twitter API
var twitter = require('twitter');

// Spotify API
var spotify = require('spotify');

// Pull  information from keys.js, where the Twitter API access keys are stored
var keys = require("./keys.js");

// Take in an input value
var action = process.argv[2];


// Open Movie Database (OMDb API)

// Run the request function...
// The request function takes in a URL then returns three arguments:
// 1. It provides an error if one exists.
// 2. It provides a response (usually that the request was successful)
// 3. It provides the actual body text from the website.
// request("http://www.omdbapi.com", function(error, response, body) {

  // If the request was successful...
//   if (!error && response.statusCode === 200) {

    // Then log the body from the site!
//     console.log(body);
//   }
// });

// Bonus
// 1) Output data to a .txt file
// 2) Append each command ran to log.txt

// This block of code will create a file called "log.txt".
// It will then print "Inception, Die Hard" in the file
// fs.writeFile("log.txt", "Inception, Die Hard", function(err) {

  // If the code experiences any errors it will log the error to the console.
//   if (err) {
//     return console.log(err);
//   }

  // Otherwise, it will print: "log.txt was updated!"
//   console.log("log.txt was updated!");

// });