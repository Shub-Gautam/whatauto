const data = require("./Database/LocationDatabase/countries+states+cities.json");

let arr = [];
data.array.forEach((element) => {
  arr.push(element.id);
});
