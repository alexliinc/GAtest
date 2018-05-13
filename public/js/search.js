$(document).ready(function() {

  $('#search').click(function() {

    var searchURL = 'https://www.omdbapi.com/?apikey=9847cd57&s=' + $('#mySearch').val();
    console.log(searchURL);


    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var objResponse = JSON.parse(this.responseText);
        console.log(objResponse)

        for (var i = 0; objResponse.Search.length; i++) {
          document.getElementById("contents").innerHTML += '<div class="listing"><strong>Title: <a href="/more-details?imdbID=' + objResponse.Search[i].imdbID + '"class="modeDetails"><span class="title">' +
            objResponse.Search[i].Title + '</span></a></strong>' +
            '<div><strong>Year:</strong> <span class="year">' + objResponse.Search[i].Year + '</span></div>' +
            '<div><strong>Type:</strong> <span class="type">' + objResponse.Search[i].Type + '</span></div>' +
            '<div><a href="/save-favorites?title=' + objResponse.Search[i].Title + '" class="saveFavorites' + objResponse.Search[i].imdbID + '">' +
            '<button type="button" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-star" aria-hidden="true"></span> Favorite' +
            '</button></a></div></div>';
        }
      }

    };
    xhttp.open("GET", searchURL, true);
    xhttp.send();
  });


});
