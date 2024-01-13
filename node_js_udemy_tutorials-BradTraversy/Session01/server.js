//Http is npm core module, i.e. when we install node it comes with it no need to do npm install http
const http = require("http");
const { todo } = require("node:test");

const todos = [
  { id: 1, text: "Todo One" },
  { id: 2, text: "Todo One" },
  { id: 3, text: "Todo One" },
  { id: 4, text: "Todo One" },
  { id: 5, text: "Todo One" },
];
const server = http.createServer(function (req, res) {
  const { headers, url, method } = req;
  console.log({ headers, url, method });
  console.log(req.method);

  //  res.setHeader("Content-Type", "text/plain");
  //  res.write('Hello World');

  //   res.setHeader("Content-Type", "text/html");
  //   res.setHeader("X-Powered-By", "Node.js");
  //   res.write("<h1 style='font-family:sans-serif'>Hello World</h1>");
  //   res.write("<p style='font-family:sans-serif'>This is some dummy content</p>");

  //   res.setHeader("Content-Type", "application/json");
  //   res.setHeader("X-Powered-By", "Node.js");
  //   res.end(
  //     JSON.stringify({
  //       success: true,
  //       data: todos,
  //     })
  //   );

  //   res.statusCode = 404;
  //   res.setHeader("Content-Type", "application/json");
  //   res.setHeader("X-Powered-By", "Node.js");
  //   OR
  //   res.writeHead(404, {
  //     "Content-Type": "application/json",
  //     "X-Powered-By": "Node.js",
  //   });

  //   console.log(`Header: ${req.headers.authorization}`);

  //   let body = [];
  //   req
  //     .on("data", (chunk) => {
  //       body.push(chunk);
  //     })
  //     .on("end", () => {
  //       body = Buffer.concat(body).toString();
  //       console.log(`Body: ${body}`);
  //     });

  //    res.end(
  //     JSON.stringify({
  //       success: false,
  //       error: "Not found",
  //       data: null,
  //     })
  //   );

  let body = [];

  req
    .on("data", (chunk) => {
      body.push(chunk);
    })
    .on("end", () => {
      body = Buffer.concat(body).toString();

      let statusCode = 404;
      const response = {
        success: false,
        data: null,
        error: null,
      };

      //Switch between different methods
      if (method === "GET" && url === "/todos") {
        statusCode = 200;
        response.success = true;
        response.data = todos;
      } else if (method === "POST" && url === "/todos") {
        const { id, text } = JSON.parse(body);
        if (!id || !text) {
          statusCode = 400;
          response.error = "please add id and text";
        } else {
          todos.push({ id, text });
          statusCode = 201;
          response.success = true;
          response.data = todos;
        }
      }

      res.writeHead(statusCode, {
        "Content-Type": "application/json",
        "X-Powered-By": "Node.js",
      });

      res.end(JSON.stringify(response));
    });

  //   res.end();
});

const PORT = 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
