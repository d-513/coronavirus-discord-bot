require("dotenv").config();
const { Client } = require("discord.js");
const puppeteer = require("puppeteer");
const url =
  "https://gisanddata.maps.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6";
const prefix = "devcov!";

const client = new Client();
let data = {};
let getData = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  setTimeout(async () => {
    const text = {};
    text.infected = await page.evaluate(
      () => document.querySelectorAll("text")[1].textContent
    );
    text.dead = await page.evaluate(
      () => document.querySelectorAll("text")[7].textContent
    );
    text.recovered = await page.evaluate(
      () => document.querySelectorAll("text")[9].textContent
    );
    browser.close();
    data = text;
  }, 5000);
};
setInterval(() => getData(), 3600000); // one hour interval

client.once("ready", async () => {
  client.user.setActivity(
    `cov!info | Shards launching... | ${client.shard.count} shards`
  );
  setInterval(async () => {
    try {
      let guilds = await client.shard.fetchClientValues("guilds.cache.size");
      let total = 0;
      guilds.forEach(count => {
        total += count;
      });
      client.user.setActivity(
        `cov!info | ${total} guilds | ${client.shard.count} shards`
      );
    } catch (e) {
      client.user.setActivity(`error: Serverinfo`);
    }
  }, 10000);
});

getData();

client.on("message", async message => {
  let content = message.content;
  if (content.startsWith(prefix)) {
    let cmd = content.substring(prefix.length).toLowerCase();
    if (cmd === "info") {
      if (!data.infected || !data.recovered || !data.dead) {
        message.channel.send(
          "No data fetched, please try again in a few seconds."
        );
        return;
      }
      message.channel.send(
        `**Total infected** \n${data.infected}\n\n**Total Recovered** \n${data.recovered}\n\n**Total dead** \n${data.dead}\n \`\`\`data from ${url} \`\`\``
      );
    }

    if (cmd === "guilds") {
      if (message.author.id === process.env.AUTHOR) {
        let msg = "Guilds: \n```";
        client.guilds.cache.forEach(guild => (msg += `${guild}, `));
        msg += "```";
        message.channel.send(msg);
      } else {
        message.channel.send("Bot-owner only command!");
      }
    }
  }
});

client.login(process.env.TOKEN);
