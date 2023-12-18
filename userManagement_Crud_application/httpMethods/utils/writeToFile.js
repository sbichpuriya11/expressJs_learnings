const fs = require("fs");
const path = require("path");
module.exports = (data) => {
  console.log(`The data to write into the file`, data);

  try {
    fs.writeFileSync(
      path.join(__dirname, "..", "..", "data", "users.json"),
      JSON.stringify(data),
      "utf-8"
    );
  } catch (err) {
    console.log(err);
  }
};
