# CoronaVirus bot
Web scraping discord bot showing spread of the new coronavirus.

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