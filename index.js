require("dotenv").config();
const { CommandoClient } = require("discord.js-commando");
const path = require("path");
const DBL = require("dblapi.js");

const client = new CommandoClient({
  commandPrefix: "cov!",
  owner: process.env.AUTHOR
});

if (process.env.DBL) {
  console.log("INFO: Creating a DBL instance");
  new DBL(process.env.DBL, client);
}

client.registry
  .registerDefaultTypes()
  .registerDefaultGroups()
  .registerDefaultCommands()
  .registerGroups([["cov", "CoronaVirus"]])
  .registerCommandsIn(path.join(__dirname, "commands"));

client.on("ready", () => {
  console.log("INFO: Bot is ready");
  client.user.setActivity("cov!help");
});

client.login(process.env.TOKEN);
