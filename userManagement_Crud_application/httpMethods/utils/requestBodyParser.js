module.exports = (req) => {
  return new Promise((res, rej) => {
    try {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });
      req.on("end", () => {
        res(JSON.parse(body));
      });
    } catch (err) {
      console.log(err);
      rej(err);
    }
  });
};
