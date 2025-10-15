# Message Search Bot

A simple Discord bot and REST API that searches messages across all text channels in a server.

---

## Features

* Search messages containing a specific keyword.
* Accessible via Discord command or REST API.
* Built with Node.js, Express, and Discord.js v14.

---

## Setup

### 1. Clone and Install

```bash
git clone https://github.com/Pahari47/jsts-D-Bot.git
cd jsts-D-Bot
npm install
```

### 2. Create `.env` File

```bash
DISCORD_TOKEN=your_discord_bot_token
PORT=3000
```

### 3. Run the Bot

```bash
node index.js
```

---

## Discord Command

```
!search <keyword> <min_length>
```

**Example**

```
!search hello 0
```

---

## REST API

**POST** `/search-messages`

**Request Body**

```json
{
  "guildId": "YOUR_GUILD_ID",
  "word": "pikachu",
  "limit": 80
}
```

**Response**

```json
{
  "results": [
    {
      "id": "123",
      "content": "I love Pikachu",
      "channel": "general"
    }
  ]
}
```

---

## Required Permissions

* View Channels
* Read Message History
* Send Messages

---

## License

This project is licensed under the MIT License.

---
