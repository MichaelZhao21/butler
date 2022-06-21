require('dotenv').config();
const fs = require('fs');
const { Client, Collection } = require('discord.js');

// Create client
const client = new Client({
    intents: [],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});

// Attach collection of commands to client object to use in other files
client.commands = new Collection();

// Send message and change presence message when ready
client.on('ready', async () => {
    client.user.setPresence({ activities: [{ name: 'ur face :)', type: 'LISTENING' }] });
    console.log(`Ready! Logged in as ${client.user.tag}`);
    
    const user = await client.users.fetch(process.env.USER_ID);
    user.send('Butler Online!');
});

// Login using bot token
client.login(process.env.TOKEN);

// Load in command files
const commandFiles = fs.readdirSync('src/commands').filter((file) => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    // Set a new item in the Collection
    // With the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command);
}

// Listen for commands
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
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
