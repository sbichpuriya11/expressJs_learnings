//JSON Data Source::-https://generatedata.com/

const http = require("http");

const PORT = process.env.PORT || 3001;
// or;
// require("dotenv").config();

const getRequest = require("./httpMethods/getRequest");
const postRequest = require("./httpMethods/postRequest");
const putRequest = require("./httpMethods/putRequest");
const deleteRequest = require("./httpMethods/deleteRequest");

const server = http.createServer((req, res) => {
  console.log("Server Running");
  req.users = require("./data/users.json");
  //   console.log(`Users::`, req.users);
  switch (req.method) {
    case "GET":
      getRequest(req, res);
      break;
    case "POST":
      postRequest(req, res);
      break;
    case "PUT":
      putRequest(req, res);
      break;
    case "DELETE":
      deleteRequest(req, res);
      break;
  }
});

server.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
