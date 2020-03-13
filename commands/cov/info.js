const { Command } = require("discord.js-commando");
const { get } = require("axios");
const { MessageEmbed } = require("discord.js");
module.exports = class InfoCommand extends Command {
  constructor(client) {
    super(client, {
      name: "info",
      group: "cov",
      memberName: "info",
      description: "Replies with the latest coronavirus stats.",
      examples: ["cov!info"]
    });
  }
  async run(message) {
    let msg = await message.say("Loading...");
    let response = await get("https://covid2019-api.herokuapp.com/total");
    let embed = new MessageEmbed()
      .setTitle("Coronavirus stats")
      .setURL(
        "https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public"
      )
      .setAuthor(
        "CoronaVirus",
        "https://i.ya-webdesign.com/images/biohazard-transparent-plague-inc.png"
      )
      .setDescription(
        "Latest info about the novel coronavirus\nUse cov!regioninfo to get more specific information."
      )
      .addField("🌍 Total Infected", response.data.confirmed)
      .addField("🌍 Total Recovered", response.data.recovered)
      .addField("🌍 Total Dead", response.data.deaths)
      .setFooter("[!] Data might be from yesterday")
      .setColor("#FF0000");
    return await msg.edit("", embed);
  }
};
