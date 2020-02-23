const data = require("./database/accounts.json");
const uid = require("uuid/v1");
const fs = require("fs");
data.map(value => {
  value.id = uid();
});

fs.writeFileSync("./database/accounts.json", JSON.stringify(data));
