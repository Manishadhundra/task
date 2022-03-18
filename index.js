const http = require("http");

http.createServer(function (req, res) {
  
   res.writeHead(200, {'Content-Type': 'text/plain'});
 
   res.end('Hello World\n');
   
}).listen(8000);

console.log('Server started at http://35.177.231.96:8000/');