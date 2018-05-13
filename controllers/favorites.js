var fs = require('fs');
const request = require('request');


// GET /favorites
function favoriteList(req, res) {
  var data = fs.readFileSync('./data.json');
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
}

//function to remove duplicates in an array
function remove_duplicates_safe(arr) {
  var obj = {};
  var arr2 = [];
  for (var i = 0; i < arr.length; i++) {
    if (!(arr[i] in obj)) {
      arr2.push(arr[i]);
      obj[arr[i]] = true;
    }
  }
  return arr2;
}


function save_favorites(req, res) {
  //read stored data
  var data = fs.readFileSync('./data.json');
  var dataJSON = JSON.parse(data);
  //append new favorite
  dataJSON.favorites.push(req.query.title);

  var newFavorites = remove_duplicates_safe(dataJSON.favorites);

  // Prepare output in JSON format
  response = {
    favorites: newFavorites,
  };
  //saves data to data.json file
  fs.writeFile('data.json', JSON.stringify(response), function(err, data) {
    if (err) {
      return console.log(err);
    }
  });
  //redirect to favorites page
  res.redirect("/favorites");
}

function more_details(req, res) {
  var details = 'http://www.omdbapi.com/?apikey=9847cd57&i=' + req.query.imdbID
  request(details, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body)
    }
  })
};

module.exports = {
  favoriteList: favoriteList,
  save_favorites: save_favorites,
  more_details: more_details
}
