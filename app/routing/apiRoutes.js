// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================
var friendsList = require("../data/friends");

// ===============================================================================
// ROUTING
// ===============================================================================
module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------
  app.get("/api/friends", function(req, res) {
    res.json(friendsList); //register these individual endpoints.
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function(req, res) {
    var newFriendScores = req.body.scores;
	var scoresArray = [];
	var friendCount = 0;
	var bestMatch = 0;

	//for loop runs through all current friends in the list
	for(var i = 0; i<friendsList.length; i++){
		var scoresDiff = 0;
		//this will run the score to compare and contrast friends
		for(var j = 0; j< newFriendScores.length; j++){
			scoresDiff +=(Math.abs(parseInt(friendsList[i].scores[j]) - parseInt(newFriendScores[j])));
		}
		//this will push the results into scoresArray
		scoresArray.push(scoresDiff);
	}
	//after all friends are compared, find best match
	for(var i=0; i < scoresArray.length; i++){
		if(scoresArray[i] <= scoresArray[bestMatch]){
			bestMatch = i;
		}
	}
	//return bestMatch data
    var bff = friendsList[bestMatch];
    console.log(bff);
	res.json(bff);

	//pushes new submission into the friendsList array
	friendsList.push(req.body);
	});

};
