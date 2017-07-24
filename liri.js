// Import NPM packages

// Readinga and writing files
var fs = require('fs');

// Make http calls
var request = require('request');

// Twitter API
var twitter = require('twitter');

// Spotify API
var spotify = require('node-spotify-api');

// Pull  information from keys.js, where the Twitter API access keys are stored
var keys = require("./keys.js");

// Take in input value
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

// Tweet function - call Twitter API
function myTweets() {
    var twitterUsername = process.argv[3];
    if(!twitterUsername) {
        twitterUsername = 'hal_bot_2001';
    };
    params = {screen_name: twitterUsername};
    client.get("statuses/user_timeline/", params, function(err, data, response) {
        if(!err) {
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

// Spotify function - call Spotify API
function spotifySong() {
    var songName = process.argv[3];
    if(!songName) {
        songName = 'The Sign Ace of Base';
    }
    params = songName;
    spotify.search({type: "track", query: params}, function(err, data) {
        if(!err) {
            var songInfo = data.tracks.items;
            for (var i = 0; i < 5; i++) {
                if (songInfo[i] != undefined) {
                    var spotifyResults = 
                    "Artist(s): " + songInfo[i].artists[0].name +  "\r\n" +
                    "Song: " + songInfo[i].name + "\r\n" +
                    "Preview URL: " + songInfo[i].preview_url + "\r\n" +
                    "Album: " + songInfo[i].album.name + "\r\n" +
                    "---------------" + i + "---------------" + "\r\n";
                    console.log(spotifyResults);
                    log(spotifyResults);
                }          
            }
        } else {
            console.log("Error: " + err);
        }
    });
};

// OMDb function -- call OMDb API
function movieThis() {
    var movie = process.argv[3];
    if(!movie) {
        movie = "mr nobody";
    }
    params = movie;
    request("http://www.omdapi.com/?t=" + params  + "&y=&plot=short&r=json&tomatoes=true", function (err, response, body) {
        if(!err && response.statusCode == 200) {
            var movieObject = JSON.parse(body);
            var movieResults =
            "--------------- begin ---------------" + "\r\n"
            "Title: " + movieObject.Title+"\r\n"+
            "Year: " + movieObject.Year+"\r\n"+
            "IMDB rating: " + movieObject.imdbRating+"\r\n"+
            "Rotten Tomatoes rating: " + movieObject.tomatoRating+"\r\n"+
            "Country of Production: " + movieObject.Country+"\r\n"+
            "Language: " + movieObject.Language+"\r\n"+
            "Plot: " + movieObject.Plot+"\r\n"+
            "Actors: " + movieObject.Actors+"\r\n" +
            "--------------- + end + ---------------" + "\r\n";
            console.log(movieResults);
            log(movieResults);
        } else {
            console.log("Error: "+ err);
            return;
        }
    });
};

// "Do What It Says" function - Uses the read and write module to access 'random.txt', 
// LIRI runs a command from it

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(err, data) {
        if(!err) {
            doWhatItSaysResults = data.split(",");
            spotifySong(doWhatItSaysResults[0], doWhatItSaysResults[1]);
        } else {
            console.log("Error: " + err);
        }
    });
};

// Log results function - Uses read and write to access 'log.txt' and 
// writes everything that is returned to the terminal into 'log.txt'.
function log(logResults) {
    fs.appendFile('log.txt', logResults, (err) => {
        if(err) {
            return console.log(err);
        } else {
            console.log('log.txt was updated!')
        }
    });
};