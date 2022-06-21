require('dotenv').config();
const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

// Get command files
const commands = [];
const commandFiles = fs.readdirSync('src/commands').filter((file) => file.endsWith('.js'));

// Load all data from command files
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

// Create rest instance
const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

// If the guild ID is NOT present, run the global-level deploy (this will take up to an hour to propogate and is for production deploy)
rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands })
    .then(() =>
        console.log(
            'Successfully registered GLOBAL application commands. (Please wait for up to an hour for changes to propogate)'
        )
    )
    .catch(console.error);
