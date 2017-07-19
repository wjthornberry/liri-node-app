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
var liriAction = process.argv[2];

// LIRI commands
switch (liriAction) {
    case "my-tweets": myTweets(); break;
    case "spotify-this-song": spotifySong(); break;
    case "movie-this": movieThis(); break;
    case "do-what-it-says": doWhatItSays(); break;
    // User instructions in Terminal
    default: console.log("\r\n" + "Hello, I\'m LIRI. Perhaps you\'ve heard of my more famous cousin, SIRI? SIRI is a Speech Interpretation and Recognition Interface, while I am a _Language_ Interpretation and Recognition Interface. To utilize me, type 'node liri.js', enter a space, and then one of the following commands:" +"\r\n"+
        "1. my-tweets 'insert any Twitter handle here'>. For example, my-tweets @BarackObama"+"\r\n"+
        "2. spotify-this-song 'song name'>. Ex: spotify-this-song 'Girl from the North Country' (Song titles with more than one word must be enclosed in quotation marks)" +"\r\n"+
        "3. movie-this <insert movie name>. Ex: movie-this 'Seven Samurai'. (Movie titles with more than one word must be enclosed in quotation marks)" +"\r\n");
};

// FUNCTIONS

// Tweet function
function myTweets() {
    var twitterUsername = process.argv[3];
    if(!twitterUsername) {
        twitterUsername = 'hal_bot_2001';
    };
    params = {screen_name: twitterUsername};
    client.get("statuses/user_timeline/", params, function(err, data, response) {
        if (!error) {
            for (var i = 0; i < data.length; i++) {
                var twitterResults = 
                "@" + data[i].user.screen_name + ": " +
                data[i].text + "\r\n" +
                data[i].created_at + "\r\n" +
                "---------------" + i + "---------------" + "\r\n";
                console.log(twitterResults);
                log(twitterResults);
            } 
        } else {
                console.log("Error :"+ err);
                return;
            }
        });
    };


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