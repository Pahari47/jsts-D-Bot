const { Client, GatewayIntentBits, Partials } = require("discord.js");
const express = require("express");
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel, Partials.Message],
});

const app = express();
app.use(express.json());

client.on("clientReady", async () => {
  console.log(`Logged in as ${client.user.tag}`);
  const guilds = client.guilds.cache.map((g) => `${g.id} | ${g.name}`);
  console.log("Guilds the bot can see:", guilds);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith("!search")) {
    const args = message.content.split(" ");
    const word = args[1];
    const limit = parseInt(args[2]) || 0;

    if (!word) {
      return message.reply("Usage: `!search <word> <limit>`");
    }

    await message.reply(`Searching for "${word}" with limit ${limit}...`);

    const guild = message.guild;
    let results = [];
    const channels = await guild.channels.fetch();

    for (const [id, channel] of channels) {
      if (!channel.isTextBased()) continue;

      const perms = channel.permissionsFor(client.user);
      if (!perms.has("ViewChannel") || !perms.has("ReadMessageHistory")) continue;

      const messages = await channel.messages.fetch({ limit: 50 }).catch(() => []);
      messages.forEach((msg) => {
        if (
          msg.content.toLowerCase().includes(word.toLowerCase()) &&
          msg.content.length >= limit
        ) {
          results.push(`[${channel.name}] ${msg.author.username}: ${msg.content}`);
        }
      });
    }

    if (results.length === 0) {
      return message.reply("No matching messages found 😅");
    }

    const output = results.slice(0, 5).join("\n");
    await message.reply(`Found ${results.length} matches:\n${output}`);
  }
});

app.post("/search-messages", async (req, res) => {
  const { guildId, word, limit } = req.body;

  if (!guildId || !word || typeof limit !== "number") {
    return res.status(400).json({ error: "guildId, word, and limit are required" });
  }

  try {
    const guild = await client.guilds.fetch(guildId);
    if (!guild) return res.status(404).json({ error: "Guild not found" });

    let results = [];
    const channels = await guild.channels.fetch();

    for (const [id, channel] of channels) {
      if (!channel.isTextBased()) continue;

      const perms = channel.permissionsFor(client.user);
      if (!perms.has("ViewChannel") || !perms.has("ReadMessageHistory")) continue;

      const messages = await channel.messages.fetch({ limit: 50 }).catch(() => []);
      messages.forEach((msg) => {
        if (
          msg.content.toLowerCase().includes(word.toLowerCase()) &&
          msg.content.length >= limit
        ) {
          results.push({
            id: msg.id,
            content: msg.content,
            channel: channel.name,
          });
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
