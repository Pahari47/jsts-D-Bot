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