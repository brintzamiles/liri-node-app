# liri-node-app

## Getting Started
*Note: You must run the following command to get started...
``` $bash
npm install
```

LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

## Acceptable search strings
Names of artists, songs, or movies do not need to be in quotes: 

### Search Type:  [Concert] When given an artist name, this seach will return upcoming concerts/dates/venues.
(https://github.com/brintzamiles/liri-node-app/blob/master/images/concert-this-with-parameter.png) 
Command line:  node liri.js concert-this [artist name] 
Returns:   Date, Venue, Location

Default artist when there is no concert parameter specified is 'Nicki Minaj'; (https://github.com/brintzamiles/liri-node-app/blob/master/images/concert-this-default.png) 
Command line:  node liri.js concert-this [artist name] 
Returns:   Date, Venue, Location

### Search Type:  [Song] When given a song name, this search will return song information (song, artist, album, preview)
* (No Parameter/Default)

Default song when there is no song parameter specified is 'The Sign Ace Of Base';   (https://github.com/brintzamiles/liri-node-app/blob/master/images/spotify-this-song-default.png) 
* Command line:  node liri.js spotify-this-song 

* (With a Song Parameter)
(https://github.com/brintzamiles/liri-node-app/blob/master/images/spotify-this-song-with-parameter.png)
* Command line:  node liri.js spotify-this-song [song and/or artist name] 
* Returns:   Artist, Song, Album, Preview

### Search Type:  [Movie]  When given a movie, this search will return Title, Year, IMDB Rating, Rottom Tomatoes Rating, Country, Language, Plot, Actors

* (With Movie Parameter) 
(https://github.com/brintzamiles/liri-node-app/blob/master/images/movie-this-with-parameter.png)  
* Command line:  node liri.js movie-this [movie name] parameter.PNG
* Returns:  Title, Year, IMDB Rating, Rottom Tomatoes Rating, Country, Language, Plot, Actors

* (No Parameter/Default)
(https://github.com/brintzamiles/liri-node-app/blob/master/images/movie-this-default.png)  
* Command line:  node liri.js movie-this
* Returns:  Title, Year, IMDB Rating, Rottom Tomatoes Rating, Country, Language, Plot, Actors


### Search Type:  [Do as you're told (From File)]

(https://github.com/brintzamiles/liri-node-app/blob/master/images/do-what-it-says.png) 
Command line:  node liri.js do-what-it-says
Returns:  Results from query contained in the random.txt file

## Technologies

* Javascript
* jQuery
* NodeJS
* NPM Packages
    * moment
    * request
    * node-spotify-api
    * fs
* APIs
    * Bands in Town
    * Spotify
    * OMDB

## Links

 https://brintzamiles.github.io/liri-node-app/

## Author

* **Brintza Miles** - [brintzamiles](https://github.com/brintzamiles)
