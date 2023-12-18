const writeToFile = require("./utils/writeToFile");

const deleteRequest = (req, res) => {
  console.log(`DELETE method called`);
  const baseURL = req.url.substring(0, req.url.lastIndexOf("/") + 1);
  console.log(baseURL);
  const id = req.url.split("/")[3];
  if (baseURL === "/api/users/" && id) {
    console.log(id);
    const index = req.users.findIndex((user) => {
      return user.user_id === id;
    });
    if (index != -1) {
      req.users.splice(index, 1);
      writeToFile(req.users);
      res.status = 200;
      res.end(JSON.stringify({ message: "User Deleted" }));
    } else {
      res.statusCode = 404;
      res.end(
        JSON.stringify({
          title: "Not Found",
          message: `User with id ${id} not found.`,
        })
      );
    }
  }
};

module.exports = deleteRequest;
