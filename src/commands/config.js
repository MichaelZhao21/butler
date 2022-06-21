const { CommandInteraction, MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

/**
 * Sends help message to user
 *
 * @param {CommandInteraction} interaction Discord message object
 */
async function sendHelpMessage(interaction) {
    let configCount = 0;
    const embed = new MessageEmbed().setColor('#e5c914').setTitle('Configuration');

    const dailytime = interaction.options.get('dailytime');
    if (dailytime) {
        configCount++;
        embed.addField('Daily Update Time', dailytime.value);
    }

    embed.setDescription(`${configCount} fields were updated!`);
    interaction.reply({ embeds: [embed] });
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('config')
        .setDescription('Configures a specific option')
        .setDMPermission(true)
        .addStringOption((option) =>
            option
                .setName('dailytime')
                .setDescription('Time of the daily update (formatted as HH:mm in 24-hour time)')
        ),
    async execute(interaction) {
        await sendHelpMessage(interaction);
    },
};
