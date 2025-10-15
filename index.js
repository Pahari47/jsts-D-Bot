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
    const { guildId, word, limit } = req.body;

    if (!guildId || !word || !limit) {
        return res.status(400).json({ error: "guildId, word, and limit are required" });
    }

    try {
        const guild = await client.guilds.fetch(guildId);
        if (!guild) return res.status(404).json({ error: "Guild not found" });

        let results = [];
        const channels = await guild.channels.fetch();

        for (const [channelId, channel] of channels) {
            if (!channel.isTextBased()) continue;

            // Fetch last 50 messages for testing
            const fetched = await channel.messages.fetch({ limit: 50 });
            
            fetched.forEach(msg => {
                if (msg.content.toLowerCase().includes(word.toLowerCase()) && msg.content.length >= Number(limit)) {
                    results.push({ id: msg.id, content: msg.content, channel: channel.name });
                }
            });
        }

        res.json({ results });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));
client.login(process.env.DISCORD_TOKEN);
