const requestBodyParser = require("./utils/requestBodyParser");
const crypto = require("crypto");
const writeToFile = require("./utils/writeToFile");
const postRequest = async (req, res) => {
  console.log(`POST method called`);
  if (req.url === "/api/users") {
    let body = await requestBodyParser(req);
    body.user_id = crypto.randomUUID();
    if (
      !body.name ||
      !body.email ||
      !body.country ||
      !body.region ||
      !body.phone
    ) {
      res.statusCode = 400;
      res.end(
        JSON.stringify({
          title: "Bad Request",
          message: "All fields are mandatory",
        })
      );
    }
    req.users.push(body);
    writeToFile(req.users);
    res.statusCode = 201;
    res.end(JSON.stringify({ message: "User created successfully" }));
    console.log(body);
  } else {
    res.statusCode = 404;
    res.end(
      JSON.stringify({
        title: "Not Found",
        message: "Requested Source not found",
      })
    );
  }
};

module.exports = postRequest;
