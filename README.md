# CoronaVirus bot
Web scraping discord bot showing spread of the new coronavirus.
You can invite the version I am hosting [here](https://discordapp.com/api/oauth2/authorize?client_id=683928960471793691&permissions=2048&scope=bot)

## Running
```
git clone https://github.com/dada513/coronavirus-discord-bot.git
cd coronavirus-discord-bot
npm i
code .env
npm run devStart
```

## Commands
`cov!info` - Show stats of the virus

## .env
You need to create a `.env` file with `token` value to run the bot.
The token is a bot token obtained from [Discord Developers](https://discordapp.com/developers/applications/)
Example:
```
# .env
TOKEN=your_token
```