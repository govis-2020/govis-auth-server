const cs = require("./lib/cs");
const library = require("./lib/library");

const start = async () => {
  console.log(await cs('notice_under'));
};

start();
