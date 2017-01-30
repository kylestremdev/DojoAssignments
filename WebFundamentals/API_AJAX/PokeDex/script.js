$(document).ready(function () {
  for(var i = 1; i <= 151; i++){
    $('#pokelist').append("<img src='http://pokeapi.co/media/img/"+i+".png' data=" + i + " />");
  }

  $(document).on('click', 'img', function () {
    var url = 'http://pokeapi.co/api/v1/pokemon/' + $(this).attr('data');
    var img = $(this)[0].outerHTML;
    var pokedex = $('#pokedex');

    $.get(url, function (data) {
      pokedex.html("<h4>"+ data.name + "</h4>" +
                          img);
      pokedex.append("<h5>Type(s):</h5>");
      var html_str = "<ul>";
      data.types.forEach(function (item){
        html_str += "<li>" + item.name + "</li>";
      });
      html_str += "</ul>";

      html_str += "<h5>Height: <span>" + data.height + "</span></h5>";
      html_str += "<h5>Weight: <span>" + data.weight + "</span></h5>";
      pokedex.append(html_str);
    });
  });
});
