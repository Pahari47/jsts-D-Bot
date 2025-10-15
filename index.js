const { Client, GatewayIntentBits } = require("discord.js");
const express = require('express');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
})

const app = express();
app.use(express.json());

app.post('/search-messages', async (req, res) => {
    const {guildId, word, limit} = req.body;

    if(!guildId || !word || !limit) {
        return res.status(400).json({error: "guildId, word, and limit are required"});
    }

    try {
        
    } catch (error) {
        
    }
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));
client.login(process.env.DISCORD_TOKEN)