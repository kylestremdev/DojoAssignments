var http = require("http");
var fs = require("fs");

var server = http.createServer(function (request, response) {
  if (request.url === '/cars') {
    fs.readFile('views/cars.html', 'utf8', function (errors, contents) {
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.write(contents);
      response.end();
    });
  } else if (request.url === '/images/car.jpeg') {
    fs.readFile('images/car.jpeg', function (errors, contents) {
      response.writeHead(200, {'Content-Type': 'image/*'})
      response.write(contents);
      response.end();
    });
  }

  else if (request.url === '/cats') {
    fs.readFile('views/cats.html', 'utf8', function (errors, contents) {
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.write(contents);
      response.end();
    });
  } else if (request.url === '/images/cat.jpeg') {
    fs.readFile('images/cat.jpeg', function (errors, contents) {
      response.writeHead(200, {'Content-Type': 'image/*'})
      response.write(contents);
      response.end();
    });
  }

  else if (request.url === '/cars/new') {
    fs.readFile('views/new.html', 'utf8', function (errors, contents) {
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.write(contents);
      response.end();
    });
  }





  else {
    response.writeHead(404);
    response.write("404, page no found");
    response.end();
  }
});

server.listen(8000);
