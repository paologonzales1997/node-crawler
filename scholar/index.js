const scholar = require("google-scholar");
const fs = require("fs");
const uuidv1 = require("uuid/v1");
// const { downloadPDF } = require("../functions");

async function search(topic) {
  console.log("Spider started!!!");
  const data = require("../database/database.json");
  let result = await scholar.search(topic.title);
  console.log(result)
  result.results.map(doc => {
    if (doc.title) {
      if (doc.description) {
        if (doc.pdf) {
          if (!data.some(e => e.title == doc.title)) {
            const link = doc.pdf.split(".");
            if (link[link.length - 1] == "pdf") {
              const uid = uuidv1();
              console.log("Saving document");
              data.push({
                id: uid,
                title: doc.title,
                description: doc.description,
                pdf: doc.pdf,
                topic_id: topic.id
              });
            }
          }
        }
      }
    }
  });
  fs.writeFileSync("./database/database.json", JSON.stringify(data));
  console.log("Done");
}
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const topics = require("../database/topics.json");
const topic = topics[getRandomInt(topics.length - 1)]
console.log(topic.title);
search(topic)

module.exports = search;
