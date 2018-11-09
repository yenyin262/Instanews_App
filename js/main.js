var url = "https://api.nytimes.com/svc/topstories/v2/home.json";

var newsDiv = $(".newsData");

//on select option
$("#select_options").change(function() {
  var option_text = $("#select_options option:selected")
    .val()
    .replace(" ", "");
  url = "https://api.nytimes.com/svc/topstories/v2/" + option_text + ".json";

  $.ajax({
    url: addApi_key(url),
    method: "GET"
  })
    .done(function(result) {
      var data = result.results;
      $(".select_option").css({"height": "auto"});
      if ($( window ).width() > 600) {
      $(".header").css({
        "height": "14vh",
      })
    }
    newsDiv.empty()
      addNewsToDiv(data);
    })
    .fail(function(err) {
      throw err;
    });
});

// add apiKey to Url
function addApi_key(urlText) {
  urlText +=
    "?" +
    $.param({
      "api-key": "cec89a9c54f24354af812aedc5a43321"
    });
  return urlText;
}
// Add data to news Conatiner

function addNewsToDiv(dataArr) {

  $.each(dataArr, function(index, value) {
    
    var abstract = value.abstract;
    var newsUrl = value.url;
    if (value.multimedia.length !== 0) {
      var imgurl = value.multimedia[4].url;

      newsDiv.append(
        '<div class= "newsDiv"><img src = "' +
          imgurl +
          '"><a target = "_blank" href = "' +
          newsUrl +
          '" ><p>' +
          abstract +
          "</p></a></div>"
      );
      //
      return index < 11;
    }
  });
}

//Remove duplicate value from Array
// function removeDups(names) {
//   var unique = {};
//   names.forEach(function(i) {
//     if (!unique[i]) {
//       unique[i] = true;
//     }
//   });
//   return Object.keys(unique);
// }
