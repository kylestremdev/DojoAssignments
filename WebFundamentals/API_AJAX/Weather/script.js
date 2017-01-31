$(document).ready(function() {
    $('form').submit(function() {
        // your code here (build up your url)
        var key = '8a5520d26b3dda4bde39d3c58fed76f5';

        var city = $('input[name="location"]').val();
        var url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + '&appid=' + key;
        $.get(url, function(res) {
            // your code here
            var temp = res.main.temp * (9/5) - 459.67;
            var html_str = "";
            html_str += "<h2>" + res.name + "</h2>";
            html_str += "<p>Temperature: " + Math.round(temp) + "&deg;F</p>";

            $('#weather').html(html_str);
        }, 'json');
        // don't forget to return false so the page doesn't refresh
        return false;
    });
});
