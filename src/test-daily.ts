import dotenv from 'dotenv';
import { Client } from 'discord.js';
import { getUser } from './util';
import { loadSettingsFromFile } from './functions/settings';
import state from './functions/state';
import { runDailyTask } from './functions/daily';

// Environmental variables
dotenv.config();

// Set settings
state.setSettings(loadSettingsFromFile());

// Create client
const client = new Client({
    intents: [],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});

// Send message and change presence message when ready
client.on('ready', async () => {
    client.user.setPresence({ activities: [{ name: 'ur face :)', type: 'LISTENING' }] });
    console.log(`Ready! Logged in as ${client.user.tag}`);

    const user = await getUser(client);
    user.send('Butler Online [for testing daily command]');

    runDailyTask(client);
});

// Login using bot token
client.login(process.env.TOKEN);
