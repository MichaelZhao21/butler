import { userMention } from '@discordjs/builders';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Client, MessageEmbed } from 'discord.js';
import fetch from 'node-fetch';
import { getUser } from '../util';

dayjs.extend(relativeTime);

export async function runDailyTask(client: Client) {
    // Get the news
    const newsEmbed = new MessageEmbed()
        .setColor('#e5c914')
        .setTitle('News for ' + dayjs().format('dddd, MMMM D, YYYY'));
    const news = await fetch(
        `https://newsapi.org/v2/top-headlines?sources=google-news&apiKey=${process.env.NEWS_API}`
    ).then((data) => data.json());
    news.articles.forEach((newsItem) => {
        newsEmbed.addField(
            newsItem.title.substring(0, 256),
            `[${dayjs(newsItem.publishedAt).fromNow()}] ${newsItem.url}`
        );
    });

    const comic = await fetch('https://xkcd.com/info.0.json').then((data) => data.json());
    const xkcdEmbed = new MessageEmbed()
        .setImage(comic.img)
        .setColor('AQUA')
        .setTitle('XKCD Comic of the Day');

    // Send all embeds
    const user = await getUser(client);
    try {
        user.send({ embeds: [newsEmbed, xkcdEmbed] });
    } catch (err) {
        console.error(err);
        user.send(err);
    }
}
