function populateContent(data) {
  var html_str = "";
  html_str += "<h3>House Details</h3>";
  html_str += "<h4>Name: <span>" + data[0].name + "</span></h4>";
  html_str += "<h4>Words: <span>" + data[0].words + "</span></h4>";
  html_str += "<h4>Titles: <span>";
  for (var i = 0; i < data[0].titles.length - 1; i++){
    html_str += data[0].titles[i] + ", ";
  }
  html_str += data[0].titles[data[0].titles.length-1] + "</span></h4>";

  return html_str
}

$(document).ready(function (){
  var url = "http://www.anapioficeandfire.com/api/houses?name=";

  $(document).on('click', 'img', function(){
    var house = $(this).attr('alt');
    $.get(encodeURI(url+house), function(data){
      $('div').html(populateContent(data));
    });
  });
});
