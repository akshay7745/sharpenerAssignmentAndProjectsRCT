const fs = require("fs");
const handler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    fs.readFile("userData.txt", "utf8", (err, data) => {
      if (err) {
        data = "no data found, try again";
      }
console.log(data);
      res.write("<html>");
      res.write("<head><title>Enter Message</title></head>");
      res.write(
        `<body><form action="/message" method="POST"><p>${data}</p> <input type="text" name="data"> <button type="submit">Send Data</button></form></body>`
      );
      res.write("</html>");
      return res.end();
    });
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFile("userData.txt", message, (err) => {
        console.log(err)
        console.log(message)
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
};

module.exports = handler;
