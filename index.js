// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();




// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get("/api/:date?",function(req,res){
    let dateObject = req.params.date;
    // dateObject should return as a number with unix

          //Unix timestamp is a way to track time as a running total of seconds. This count starts at the Unix Epoch on January 1st, 1970 at UTC. Therefore, the Unix timestamp is merely the number of seconds between a particular date and the Unix Epoch. It should return as a number.
    if(dateObject == undefined){
      dateObject = new Date();
    }
    else if(isNaN(dateObject)){
      dateObject = new Date(dateObject);
    }
    else{
      dateObject = new Date(parseInt(dateObject));
    }
    // If the date string is invalid the api returns an error JSON like { error : "Invalid Date" }
    if(dateObject.toString() === "Invalid Date"){
      res.json({error : "Invalid Date"});
    }
    
    dateObject = new Date(dateObject);
    utc = dateObject.toUTCString();
    dateObject = dateObject.getTime();
    
    // Date object return to number
    dateObject = parseInt(dateObject);


    const a = {
      unix : dateObject,
      utc: utc
    }
    
    res.json(a);

})


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
