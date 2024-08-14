
const http = require("http");

// When url = /home , return response ==> Welcome home
// When url = /about, return response ==> Welcome to About Us page
// When url =/node, return response ==> Welcome to my Node Js project
const server = http.createServer((req,res)=>{
const url = req.url;
switch(url){
    case "/home":
        res.write('<html>');
        res.write('<head><title>My first page</title></head>');
        res.write("</html>");
        res.write("<body><h1>Welcome home</h1></body>");
        res.end();
        break;
    case "/about":
        res.write('<html>');
        res.write('<head><title>My first page</title></head>');
        res.write("</html>");
        res.write("<body><h1>Welcome to About Us page</h1></body>");
        res.end(); 
        break;
    case "/node":
        res.write('<html>');
        res.write('<head><title>My first page</title></head>');
        res.write("</html>");
        res.write("<body><h1>Welcome to my Node JS project</h1></body>");
        res.end();    
        break;
     default:
        res.write('<html>');
        res.write('<head><title>My first page</title></head>');
        res.write("</html>");
        res.write("<body><h1>Welcome to any url</h1></body>");
        res.end();   
}
});

server.listen(4000);