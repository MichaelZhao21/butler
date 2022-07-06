import { CommandInteraction, MessageEmbed } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

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

export default {
    data: new SlashCommandBuilder()
        .setName('config')
        .setDescription('Configures a specific option')
        .setDMPermission(true)
        .addStringOption((option) =>
            option
                .setName('dailytime')
                .setDescription('Time of the daily update (formatted as HH:mm in 24-hour time)')
        ),

    execute: async (interaction) => {
        await sendHelpMessage(interaction);
    },
};
