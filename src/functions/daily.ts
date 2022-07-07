import dayjs from 'dayjs';
import { Client, MessageEmbed } from 'discord.js';
import fetch from 'node-fetch';
import { getUser } from '../util';

export async function runDailyTask(client: Client) {
    // Get the news
    const newsEmbed = new MessageEmbed()
        .setColor('#e5c914')
        .setTitle('News for ' + dayjs().format('dddd, MMMM D, YYYY'));
    const news = await fetch('https://api.michaelzhao.xyz/news').then((data) => data.json());
    news.articles.forEach((newsItem) => {
        newsEmbed.addField(
            newsItem.title.substring(0, 256),
            `[${newsItem.source.name}] ${newsItem.url}`
        );
    });

    // Send all embeds
    const user = await getUser(client);
    user.send({ embeds: [newsEmbed] }).catch((err) => {
        console.error(err);
        user.send(err);
    });
}
