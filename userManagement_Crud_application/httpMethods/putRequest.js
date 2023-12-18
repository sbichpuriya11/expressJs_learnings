const requestBodyParser = require("../httpMethods/utils/requestBodyParser");
const writeToFile = require("./utils/writeToFile");
const putRequest = async (req, res) => {
  console.log(`PUT method called`);
  const baseURL = req.url.substring(0, req.url.lastIndexOf("/") + 1);
  const id = req.url.split("/")[3];
  if (baseURL === "/api/users/" && id) {
    const userFetchedIndex = req.users.findIndex((user) => {
      return user.user_id === id;
    });
    console.log(`Index of User Fetched: ${userFetchedIndex}`);
    if (userFetchedIndex != -1) {
      const updatedUser = await requestBodyParser(req);
      console.log(`Updated User Data:: ${{ user_id: id, ...updatedUser }}`);
      req.users[userFetchedIndex] = { user_id: id, ...updatedUser };
      writeToFile(req.users);
      res.statusCode = 200;
      res.end(JSON.stringify({ title: "User details updated" }));
    } else {
      res.statusCode = 400;
      res.end(
        JSON.stringify({
          title: "Not Found",
          message: `User with id ${id} not found.`,
        })
      );
    }
  } else {
    res.statusCode = 404;
    res.end(
      JSON.stringify({ title: "Not Found", message: "Requested URL not found" })
    );
  }
};

module.exports = putRequest;
