
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

// Grab Twitter keys
var twitterClient = keys.client;

// Grab Spotify keys
var spotify = keys.spotify;

// Take in input value
var liriAction = process.argv[2];

// LIRI commands
switch (liriAction) {
    // Line 42
    case "my-tweets": myTweets(); break;
    // Line 62
    case "spotify-this-song": spotifySong(); break;
    // Line 91
    case "movie-this": movieThis(); break;
    // Line 133
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
    var params = {
        screen_name: 'hal_bot_2001'
    };
    twitterClient.get('statuses/user_timeline', params, function(err, tweets, response) {
        if (!err) {
            for (var i = 0; i < tweets.length; i++) {
                console.log(`\nTweet ${i + 1}: ${tweets[i].text}`);
                console.log(`Date: ${tweets[i].created_at}`);
                console.log('\n---------------');
            }
        } else {
            console.log('Error: ' + err);
        }
    });
}

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
}

// OMDb function -- call OMDb API
function movieThis() {
    var movie = process.argv[3];
    if(!movie) {
        movie = 'mr nobody';
    }
        params = movie
        request('http://www.omdbapi.com/?apikey=40e9cece&t=' + params + '&tomatoes=true&r=json', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            jsonBody = JSON.parse(body);
            console.log(' ');
            console.log('Title: ' + jsonBody.Title);
            console.log('Year: ' + jsonBody.Year);
            console.log('IMDb Rating: ' + jsonBody.imdbRating);
            console.log('Country: ' + jsonBody.Country);
            console.log('Language: ' + jsonBody.Language);
            console.log('Plot: ' + jsonBody.Plot);
            console.log('Actors: ' + jsonBody.Actors);
            console.log('Rotten Tomatoes Rating: ' + jsonBody.tomatoRating);
            console.log('Rotten Tomatoes URL: ' + jsonBody.tomatoURL);
            console.log(' ');
            fs.appendFile('log.txt', ('=============== LOG ENTRY BEGIN ===============\r\n' + Date() + '\r\n \r\nTERMINAL COMMANDS: ' + process.argv + '\r\nDATA OUTPUT:\r\n' + 'Title: ' + jsonBody.Title + '\r\nYear: ' + jsonBody.Year + '\r\nIMDb Rating: ' + jsonBody.imdbRating + '\r\nCountry: ' + jsonBody.Country + '\r\nLanguage: ' + jsonBody.Language + '\r\nPlot: ' + jsonBody.Plot + '\r\nActors: ' + jsonBody.Actors + '\r\nRotten Tomatoes Rating: ' + jsonBody.tomatoRating + '\r\nRotten Tomatoes URL: ' + jsonBody.tomatoURL + '\r\n =============== LOG ENTRY END ===============\r\n \r\n'), function(err) {
                if (err) throw err;
            });
        }
    });
}           

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