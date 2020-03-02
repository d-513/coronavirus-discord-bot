require("dotenv").config();
const Discord = require("discord.js");
const puppeteer = require("puppeteer");

const client = new Discord.Client();
let data = {};
let getData = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    "https://gisanddata.maps.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6"
  );
  setTimeout(async () => {
    const text = {};
    text.infected = await page.evaluate(
      () => document.querySelectorAll("text")[1].textContent
    );
    text.dead = await page.evaluate(
      () => document.querySelectorAll("text")[5].textContent
    );
    text.recovered = await page.evaluate(
      () => document.querySelectorAll("text")[7].textContent
    );
    browser.close();
    data = text;
  }, 5000);
};

setInterval(() => getData(), 3600000) // one hour interval

client.once("ready", async () => {
  console.log("THE BOT HAS STARTED");
  client.user.setActivity("Plague Inc || cov!info");
  getData();
});
client.on("message", async message => {
  let content = message.content;
  if (content.startsWith("cov!")) {
    let cmd = content.substring(4).toLowerCase();
    if (cmd === "info") {
      if (!data.infected) {
        message.channel.send(
          "No data fetched, please try again in a few seconds."
        );
        return;
      }
      message.channel.send(
        `**Total infected** \n${data.infected}\n\n**Total Recovered** \n${data.recovered}\n\n**Total dead** \n${data.dead}`
      );
    }
  }
});

client.login(process.env.TOKEN);
