import { CommandInteraction, MessageEmbed } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import state from '../functions/state';
import dayjs from 'dayjs';
import { saveSettings } from '../functions/settings';
import { createCronTask } from '../util';

/**
 * Sends config message to user with all fields that were configured
 *
 * @param interaction Discord message object
 */
async function sendConfigMessage(interaction: CommandInteraction) {
    let configCount = 0;
    const embed = new MessageEmbed().setColor('#e5c914').setTitle('Configuration');

    const dailytime = interaction.options.get('dailytime');
    if (dailytime) {
        configCount++;
        embed.addField('Daily Update Time', dailytime.value as string);

        const val = dailytime.value.toString();
        const hour = val.substring(0, 2);
        const min = val.substring(3, 5);
        const time = { hour, min };
        const prevState = state.getSettings();
        state.setSettings({
            ...prevState,
            time,
        });
        state.setTask(createCronTask(time, interaction.client));
        saveSettings(state.getSettings());
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
        await sendConfigMessage(interaction);
    },
} as CommandObject;
