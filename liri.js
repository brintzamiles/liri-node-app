//npm package installs plus external files
require(`dotenv`).config();
var Spotify = require(`node-spotify-api`);
var keys = require(`./keys.js`)
var spotify = new Spotify(keys.spotify);

var fs = require(`fs`);
var request = require(`request`);
const moment = require(`moment`);

//process arguments
var argv = process.argv;

// liriCommand is the index 2 argument (the third argument)
var liriCommand = argv[2];

// The 4th argument is the movie, song, etc.  It may contain spaces and could be interpreted as multiple arguments...
// This code combines them into one liri argument
var liriArg = '';
for (var i = 3; i < argv.length; i++) {
    liriArg += argv[i] + " ";
}

//The heartbeat of the app...interprets index 2 (command)
switch (liriCommand) {
    case `concert-this`:
        retrieveBandsInTown(liriArg);
        break;
    case `spotify-this-song`:
        spotifySong(liriArg);
        break;
    case `movie-this`:
        retrieveOMDBInfo(liriArg);
        break;
    case `do-what-it-says`:
        doWhatItSays();
    default:
        // Append the command to the log file
        fs.appendFile(`./log.txt`, `User Command: ${argv} \n\n`, (err) => {
            if (err) throw err;

            // If the user types in a command that LIRI does not recognize, output the Usage menu 
            // which lists the available commands.
            outputStr = `Usage:\n` +
                `    node liri.js concert-this "<artist_name>"\n` +
                `    node liri.js spotify-this-song "<song_name>"\n` +
                `    node liri.js movie-this "<movie_name>"\n` +
                `    node liri.js do-what-it-says\n`;

            // Append the output to the log file
            fs.appendFile('./log.txt', `LIRI Response:  ${outputStr}  \n\n`, (err) => {
                if (err) throw err;
                console.log(outputStr);


            });
        });
}

// retrieveBandsInTown will retrieve information on a concert from the BandsInTown database
function retrieveBandsInTown(artist) {
    // Append the command to the log file
    fs.appendFile('./log.txt', `**************************************************************************\nUser Command: node liri.js concert-this ${artist} \n\n`, (err) => {
        if (err) throw err;
    });

    var bandSearch;

    // Replace spaces with '' for the query string
    bandSearch = artist.split(' ').join('');

    if (artist === ``) {
        bandSearch = `NickiMinaj`;
    }

    console.log(bandSearch);
    const bandsInTownAPIKey = keys.bands.BANDS_API_KEY;
    // Construct the query string
    var queryStr = `https://rest.bandsintown.com/artists/${bandSearch}/events?app_id=${bandsInTownAPIKey}`;
    console.log(queryStr);

    fs.appendFile(`./log.txt`, `Query:  ${queryStr} \n\n`, (err) => {
        if (err) throw err;
    });

    const options = {
        url: queryStr,
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Accept-Charset': 'utf-8'
        }
    };

    // Send the request to BandsInTown
    request(options, function (error, response, body) {
        var data = JSON.parse(body);

        if (error != null) {
            var errorStr1 = 'ERROR: Retrieving artist entry -- ' + error;

            // Append the error string to the log file
            fs.appendFile('./log.txt', errorStr1, (err) => {
                if (err) throw err;
                console.log(errorStr1);
            });
            return;
        } else {
            for (event in data) {

                const venue = data[0].venue;
                const eventInfo = data[event];
                //format the date 
                const date = moment(eventInfo.datetime).format("MM/DD/YYYY");

                //Return and Print the Concert information
                var outputStr =
                    `\n
**************************************************************************
                        Concert Information
****************************${date}************************************
Artist:  ${eventInfo.lineup[0]}  
Venue:  ${eventInfo.venue.name} 
City:   ${eventInfo.venue.city} 
State:  ${eventInfo.venue.region}
Country: ${eventInfo.venue.country}`;
                console.log(outputStr);

                // Append the output to the log file
                fs.appendFile('./log.txt', `LIRI Response:  ${outputStr}  \n\n`, (err) => {
                    if (err) throw err;
                });

            }

        }
    });
}

// spotifySong will retrieve information on a song from Spotify
function spotifySong(song) {
    // BONUS:  Append the command to the log file
    fs.appendFile(`./log.txt`, `**************************************************************************\nUser Command: node liri.js spotify-this-song ${song} \n\n`, (err) => {
        if (err) throw err;
    });

    // If no song is provided, LIRI defaults to 'The Sign' by Ace Of Base
    var defaultSong;
    if (song === '') {
        defaultSong = 'The Sign Ace Of Base';
    } else {
        defaultSong = song;
    }

    spotify.search({
        type: 'track',
        query: defaultSong
    }, function (error, data) {
        if (error) {
            var errorStr1 = 'ERROR: Retrieving Spotify track -- ' + error;
            // Append the error string to the log file
            fs.appendFile(`./log.txt`, errorStr1, (err) => {
                if (err) throw err;
                console.log(errorStr1);
            });
            return;
        } else {
            for (song in data.tracks.items) {
                const songInfo = data.tracks.items[song];
                // Print the song information for each query returned
                var outputStr =
                    `\n
***********************************************************************************************
                            Song Information
***********************************************************************************************
Song:  ${songInfo.name}  
Artist:  ${songInfo.artists[0].name} 
Album:  ${songInfo.album.name}
Preview: ${songInfo.preview_url}`;
                console.log(outputStr);


                // Append the output to the log file
                fs.appendFile('./log.txt', `LIRI Response:  ${outputStr}  \n\n`, (err) => {
                    if (err) throw err;
                });
            }
        }
    });
}

// retrieveOMDBInfo will retrieve information on a movie from the OMDB database
function retrieveOMDBInfo(movie) {
    // Append the command to the log file
    fs.appendFile(`./log.txt`, `**************************************************************************\nUser Command: node liri.js movie-this ${movie} \n\n`, (err) => {
        if (err) throw err;
    });

    // If no movie is provided, LIRI defaults to 'Mr. Nobody'
    var search;
    if (movie === '') {
        movieSearch = 'Mr. Nobody';
    } else {
        movieSearch = movie;
    }

    // Replace spaces with '' for the query string
    movieSearch = movieSearch.split(' ').join('');
    console.log(movieSearch);
    var omdbapikey = `trilogy`;

    // Construct the query string    
    var queryStr = `https://www.omdbapi.com/?t=${movieSearch}&y=&Plot=short&apikey=${omdbapikey}`;
    console.log(queryStr);
    // Send the request to OMDB
    request(queryStr, function (error, response, body) {
        var data = JSON.parse(body);
        if (error) {
            var errorStr1 = 'ERROR: Retrieving OMDB entry -- ' + error;

            // Append the error string to the log file
            fs.appendFile('./log.txt', errorStr1, (err) => {
                if (err) throw err;
                console.log(errorStr1);
            });
            return;
        } else {
            //Print the movie information
            var outputStr =
                `\n
***************************************************************************************
                                   Movie Information                
***************************************************************************************
Movie Title:  ${data.Title}  
Date Released:  ${data.Released} 
IMDB Rating:   ${data.imdbRating} 
Language:  ${data.Language}
Plot:  ${data.Plot}
Actors: ${data.Actors}
Rotten Tomatoes Rating: ${data.tomatoRating}
Rotten Tomatoes URL:  ${data.tomatoURL};`


            // Append the output to the log file
            fs.appendFile('./log.txt', `LIRI Response:  ${outputStr}  \n\n`, (err) => {
                if (err) throw err;
                console.log(outputStr);
            });

        }
    });
}

// doWhatItSays will read in a file to determine the desired command and then execute
function doWhatItSays() {
    // Append the command to the log file
    fs.appendFile('./log.txt', '**************************************************************************\nUser Command: node liri.js do-what-it-says\n\n', (err) => {
        if (err) throw err;
    });

    // Read in the file containing the command
    fs.readFile('./random.txt', 'utf8', function (error, data) {
        if (error) {
            console.log('ERROR: Reading random.txt -- ' + error);
            return;
        } else {
            // Split out the command name and the parameter name
            var cmdString = data.split(',');
            var command = cmdString[0].trim();

            var param = cmdString[1].trim();
            console.log(cmdString);
            console.log(command);
            console.log(param);


            switch (command) {
                case 'spotify-this-song':
                    spotifySong(param);
                    break;

                case 'movie-this':
                    retrieveOMDBInfo(param);
                    break;

                case 'concert-this':
                    retrieveBandsInTown(param);
                    break;
            }
        }
    });
}