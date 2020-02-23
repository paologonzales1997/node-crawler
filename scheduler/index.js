const cron = require("node-cron");
const search = require("../scholar/index");
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

cron.schedule("* */2 * * *", () => {
  console.log("Scheduler Started");
  const topics = require("../database/topics.json");
  const topic = topics[getRandomInt(topics.length - 1)]
  console.log(topic.title);
  search(topic);
}, 'Asia/Singapore');
