const getRequest = (req, res) => {
  console.log(`GET method called`);
  const baseURL = req.url.substring(0, req.url.lastIndexOf("/") + 1);

  const id = req.url.split("/")[3];

  if (req.url === "/api/users") {
    res.statusCode = 200;
    res.end(JSON.stringify(req.users));
  } else if (baseURL === "/api/users/" && id) {
    const userFetched = req.users.filter((user) => {
      return user.user_id === id;
    });
    console.log(`User fetched`, userFetched);
    if (userFetched.length > 0) {
      res.statusCode = 200;
      res.end(JSON.stringify(userFetched));
    } else {
      res.statusCode = 404;
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

module.exports = getRequest;
