var Twitter = require('twitter');
var twit = require("./keys.js")
var client = new Twitter(twit)
var fs = require("fs");


//tweeter
var params = {screen_name: 'Liri H App', count: 20, text: true};
	function tweeti(){
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (error) {
	    console.log(error);
	  }
	  for (var i = 0; i < 20; i++) {
		  console.log("__________________________________________________________________________")
		  console.log(tweets[i].text);
		  console.log(tweets[i].created_at);
		  console.log("__________________________________________________________________________");
	  }
	});	
	}
//spotify
var Spotify = require('node-spotify-api'); 
var spotify = new Spotify({
  id: '79ba7d4578544603a5f969e8152cf7b2',
  secret: '05df9fadd3444167a8e0122557100c49'
});

	function spoti(){
	var song = process.argv[3];
	if (song == undefined){
		song = "The Sign, Ace of Base"
	}
	spotify.search({ type: 'track', query: song, limit: 1 }, function(err, data) {
	  if (err) {
	    return console.log('Error occurred: ' + err);
	  }
	console.log("+++++++++++++++++++++++++++++++++++++++++");
	console.log("Song by: " + data.tracks.items[0].artists[0].name);
	console.log("-----------------------------------------");
	console.log("Song Title: " + data.tracks.items[0].name);
	console.log("-----------------------------------------"); 
	console.log("Song preview link: " + data.tracks.items[0].preview_url);
	console.log("-----------------------------------------");
	console.log("Song album title: " + data.tracks.items[0].album.name)
	console.log("+++++++++++++++++++++++++++++++++++++++++");
	});
	}

//OMDb
var request = require("request");
function omdbi(){
	var movieName = process.argv[3];
	if (movieName == undefined){
		movieName = "Mr. Nobody";
	}
	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&tomatoes=true&apikey=40e9cece";
	request(queryUrl, function(error, response, body) {
	  if (!error && response.statusCode === 200) {
	    // * Title of the movie.
	    console.log("");
	    console.log("Title: " + JSON.parse(body).Title)
	    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
	    //    * Year the movie came out.
	    console.log("Release Year: " + JSON.parse(body).Year);
	    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
	    //    * IMDB Rating of the movie.
	    console.log("IMDB Rating: " + JSON.parse(body).imdbRating)
	    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
	    //    * Rotten Tomatoes Rating of the movie.
	    console.log("Rotten Tomato Rating: " + JSON.parse(body).tomatoRating)
	    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
	    //    * Country where the movie was produced.
	    console.log("Country: " + JSON.parse(body).Country)
	    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
	    //    * Language of the movie.
	    console.log("Language: " + JSON.parse(body).Language)
	    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
	    //    * Plot of the movie.
	    console.log("Plot: " + JSON.parse(body).Plot)
	    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
	    //    * Actors in the movie.
	    console.log("Actors: " + JSON.parse(body).Actors)
	    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
	  }
	});
}


//function calls on condition
if (process.argv[2] === "my-tweets"){
	tweeti();
};
if (process.argv[2] === "spotify-this-song") {
	spoti();
};
if (process.argv[2] === "movie-this"){
	omdbi();
};

fs.readFile("random.txt", "utf8", function(error, data) {
    var dataArr = data.split(",");
    if (process.argv[2] === "do-what-it-says"){
    	if (dataArr[0] === "spotify-this-song"){
    		process.argv[3] = dataArr[1]
    		spoti();
    	};
    	if (dataArr[0] === "my-tweets"){
    		tweeti();
    	};
    	if (dataArr[0] === "movie-this"){
    		process.argv[3] = dataArr[1]
    		omdbi();
    	};

	};
});