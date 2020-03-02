var fs = require('fs');
var data = fs.readFileSync('characters.json');
var actor = JSON.parse(data);
console.log(actor);

// console.log('server is starting');

var express = require('express');
var app = express();
var server = app.listen(3000, listening);

function listening(){
  console.log("Listening..." );
}

app.use(express.static('website'));

app.get('/add/:name/:desc', addActor);

function addActor(request, response){
  var data = request.params;
  var name = data.name;
  var desc = data.desc;
  var reply;
  if(!desc){
    reply = {
      msg: "House of the Actor is required"
    }
  }else{
    actor[name] = desc; 
    reply= {
      msg: "Added actor successfully",
      "Actor's-Name": name,
      "House": desc
    }
    var data = JSON.stringify(actor, null, 2);
    fs.writeFile('characters.json', data, finished);

    function finished(err){
      console.log('all set.');
      reply = {
        "Actor's-Name": name,
        "House": desc,
        staus: "success"
      }
      
    }
  }
  response.send(reply);
  
}

app.get('/all', sendAll);

function sendAll(request, response){
  response.send(actor);
}

app.get('/search/:name', searchActor);

function searchActor(request, response) {
  var word = request.params.word;
  var reply;
  if(actor[word]){
    reply = {
      status: "found",
      name: name,
      desc: actor[desc]
    }
  }else{
    reply = {
      status: "not found",
      name: name
    }
  }
  response.send(reply);
}