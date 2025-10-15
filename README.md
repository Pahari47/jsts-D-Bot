Message Search Bot

A simple bot and REST API to search messages across all channels in a Discord server.

Features

Search messages containing a specific keyword.

Works via Discord command or REST API.

Uses Node.js, Express, and Discord.js v14.

Setup

Clone and install

git clone https://github.com/Pahari47/jsts-D-Bot.git
cd jsts-D-Bot
npm install


Create .env

DISCORD_TOKEN=your_discord_bot_token
PORT=3000


Run

node index.js

Discord Command
!search <keyword> <min_length>


Example:

!search hello 0

REST API

POST /search-messages

{
  "guildId": "YOUR_GUILD_ID",
  "word": "pikachu",
  "limit": 80
}


Response

{
  "results": [
    { "id": "123", "content": "I love Pikachu", "channel": "general" }
  ]
}

Permissions

The bot must have:

View Channels

Read Message History

Send Messages

License

MIT License
