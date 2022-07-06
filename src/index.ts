import dotenv from 'dotenv';
import { Client, Collection } from 'discord.js';

// Import all commands
import configCommand from './commands/config';

// Environmental variables
dotenv.config();

// Create client
const client = new Client({
    intents: [],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});

// Attach collection of commands to client object to use in other files
const commands = new Collection<string, CommandObject>();

// Send message and change presence message when ready
client.on('ready', async () => {
    client.user.setPresence({ activities: [{ name: 'ur face :)', type: 'LISTENING' }] });
    console.log(`Ready! Logged in as ${client.user.tag}`);
    
    const user = await client.users.fetch(process.env.USER_ID);
    user.send('Butler Online!');
});

// Login using bot token
client.login(process.env.TOKEN);

// Set a new item in the Collection from command files
// With the key as the command name and the value as the exported module
commands.set(configCommand.data.name, configCommand);

// Listen for commands
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const command = commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        return interaction.reply({
            content: 'There was an error while executing this command!',
            ephemeral: true,
        });
    }
});
