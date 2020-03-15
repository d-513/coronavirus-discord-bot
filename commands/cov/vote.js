const { Command } = require("discord.js-commando");
module.exports = class VoteCommand extends Command {
  constructor(client) {
    super(client, {
      name: "vote",
      group: "cov",
      memberName: "vote",
      description: "Gives a link to vote for the bot.",
      examples: ["cov!vote"]
    });
  }
  async run(message) {
    return await message.say(
      "Vote for the bot here: https://top.gg/bot/683928960471793691/vote pls."
    );
  }
};
