//@desc Logs request to console
const logger = (req, res, next) => {
  //req.greet = "Hello World";
  console.log("Middleware ran");
  console.log(
    `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`
  );

  next();
};

module.exports = logger;
