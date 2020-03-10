require("dotenv").config();
const { ShardingManager } = require("discord.js");
const manager = new ShardingManager("./bot.js", {
  token: process.env.TOKEN,
  totalShards: 2
});
console.log("Shards launching");
manager.spawn(2);
manager.on("shardCreate", shard => console.log(`Launched shard ${shard.id}`));
