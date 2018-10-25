# liri-node-app
``` $bash
npm install
```

LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

## Getting Started
*Note: You must have your own API keys to Bands in Town, OMDB, and Spotify saved to a .env file on your computer to run this program.*


## Acceptable search strings.   
Names of artists, songs, or movies do not need to be in quotes: 
Search Type:  [Concert](https://github.com/brintzamiles/liri-node-app/blob/master/images/concert-this.png) 
Command line:  node liri.js concert-this [artist name] 
Returns:   Date, Venue, Location

Search Type:  [Song](https://raw.githubusercontent.com/brintzamiles/liri-node-app/master/images/spotify-this-song-default.PNG) 
Command line:  node liri.js spotify-this-song 
(https://raw.githubusercontent.com/brintzamiles/liri-node-app/master/images/spotify-this-song-with-parameter.PNG)

Command line:  node liri.js spotify-this-song [song and/or artist name] 
Returns:   Artist, Song, Album, Preview

Search Type:  [Movie](https://raw.githubusercontent.com/brintzamiles/liri-node-app/master/images/movie-this-with-parameter.PNG)  
Command line:  node liri.js movie-this [movie name] 
Returns:  Title, Year, IMDB Rating, Rottom Tomatoes Rating, Country, Language, Plot, Actors
(https://raw.githubusercontent.com/brintzamiles/liri-node-app/master/images/movie-this-default.PNG)  
Command line:  node liri.js movie-this
Returns:  Title, Year, IMDB Rating, Rottom Tomatoes Rating, Country, Language, Plot, Actors


Search Type:  [Do as you're told (From File)](https://raw.githubusercontent.com/brintzamiles/liri-node-app/master/images/do-what-it-says.PNG) 
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
