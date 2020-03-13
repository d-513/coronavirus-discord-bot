# CoronaVirus bot

A bot showing the latest stats of the novel coronavirus COVID-19

## Running

add to your server:

```
https://discordapp.com/oauth2/authorize?client_id=683928960471793691&permissions=2048&scope=bot
```

selfhost:

```
git clone https://github.com/dada513/coronavirus-discord-bot.git
cd coronavirus-discord-bot
npm i
code .env
npm run devStart
```

## Commands

`cov!info` - global information about the virus  
`cov!regioninfo` - lists most infected countries  
`cov!regioninfo list` - lists affected countries  
`cov!regioninfo COUNTRYNAME` - info about a specific country

## .env

Bot's config.

```
TOKEN=
AUTHOR=
DBL=
```

`TOKEN` - bot's token from discord developers  
`AUTHOR` - bot's owner id  
`DBL` - (optional) token for top.gg to post server count
