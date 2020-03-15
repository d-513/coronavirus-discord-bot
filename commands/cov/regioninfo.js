const { Command } = require("discord.js-commando");
const { get } = require("axios");
const { MessageEmbed } = require("discord.js");
const { flag } = require("country-emoji");
module.exports = class RegionInfoCommand extends Command {
  constructor(client) {
    super(client, {
      name: "regioninfo",
      group: "cov",
      memberName: "regioninfo",
      description: "Replies with the latest coronavirus stats for a country.",
      args: [
        {
          key: "country",
          prompt:
            "Which county's stats would you like to see? (type 'list' to view a list of them)",
          type: "string",
          default: false
        }
      ],
      examples: [
        "cov!regioninfo",
        "cov!regioninfo Poland",
        "cov!regioninfo US",
        "cov!regioninfo list"
      ]
    });
  }
  async run(message, { country }) {
    if (!country) {
      let msg = await message.say("Loading...");
      let response = await get(
        "https://covid2019-api.herokuapp.com/current_list/"
      );
      let embed = new MessageEmbed()
        .setTitle("Coronavirus regional stats")
        .setDescription(
          "Use `cov!regioninfo list` to view a list of affected countries and `cov!regioninfo <countryname>` to view information about a country. This list only contains 25 most infected countries."
        )
        .setURL(
          "https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public"
        )
        .setAuthor(
          "CoronaVirus",
          "https://i.ya-webdesign.com/images/biohazard-transparent-plague-inc.png"
        )
        .setColor("#FF0000")
        .setFooter(
          `Top 25 countries. Read above for more info about this command.`
        );
      let i = 0;
      for (let [key, value] of Object.entries(response.data.countries[0])) {
        i++;
        if (i >= 25) {
          break; // Limit fields so that discord doesn't complain about a too big embed.
        }
        let name = key.replace(/_/g, " ");
        if (name === "Cruise Ship") {
          name = `⛵ Cruise Ship\n`;
        }
        embed.addField(
          `${flag(name) || ""} ${name}`,
          `Cases: ${value.confirmed}\nRecovered: ${value.recovered}\nDeaths: ${value.deaths}`,
          true
        );
      }
      msg.edit("", embed);
    } else if (country === "list") {
      let msg = await message.say("Loading...");
      let response = await get("https://covid2019-api.herokuapp.com/countries");
      let desc =
        "Use `cov!regioninfo <country_name>` to view detailed information about a country\n\n";
      const embed = new MessageEmbed()
        .setTitle(`Coronavirus regional stats - Affected countries`)
        .setURL(
          "https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public"
        )
        .setAuthor(
          "CoronaVirus",
          "https://i.ya-webdesign.com/images/biohazard-transparent-plague-inc.png"
        )
        .setColor("#FF0000")
        .setFooter("Affected countries");
      response.data.countries.forEach(country => {
        let name = country.replace(/_/g, " ");
        if (name === "Cruise Ship") {
          desc += `⛵ Cruise Ship\n`;
          return;
        }
        desc += `${flag(name) || ""} ${name}\n`;
      });
      embed.setDescription(desc);
      return await msg.edit("", embed);
    } else {
      let msg = await message.say("Loading...");
      let response;
      try {
        response = await get(
          encodeURI(
            `https://covid2019-api.herokuapp.com/country/${country.replace(
              / /g,
              "_"
            )}`
          )
        );
      } catch (e) {
        return await msg.edit(
          `No such country: \`${country}\`. Use \`cov!regioninfo list\` to view a list of affected countries.`
        );
      }

      let data = response.data;
      delete data.dt;
      delete data.ts;
      if (!Object.keys(data)[0]) {
        return await msg.edit(
          `No such country: \`${country}\`. Use \`cov!regioninfo list\` to view a list of affected countries.`
        );
      }
      let key = Object.keys(data)[0];
      let name = key.replace(/_/g, " ");
      if (name === "Cruise Ship") {
        name = "⛵ Cruise Ship";
        return;
      }
      let embed = new MessageEmbed()
        .setTitle(`Coronavirus regional stats - Country List`)
        .setURL(
          "https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public"
        )
        .setAuthor(
          "CoronaVirus",
          "https://i.ya-webdesign.com/images/biohazard-transparent-plague-inc.png"
        )
        .setColor("#FF0000")
        .addField(
          `${flag(name) || ""} ${name}`,
          `Cases: ${data[Object.keys(data)[0]].confirmed}\nRecovered: ${
            data[Object.keys(data)[0]].recovered
          }\nDeaths: ${data[Object.keys(data)[0]].deaths}`
        );
      return await msg.edit("", embed);
    }
  }
};
