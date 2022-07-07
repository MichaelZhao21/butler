import cron from 'node-cron';
import type { Client, User } from 'discord.js';
import { runDailyTask } from './functions/daily';

export function createCronTask(
    time: { min: string; hour: string },
    client: Client
): cron.ScheduledTask {
    return cron.schedule(`${time.min} ${time.hour} * * *`, runDailyTask.bind(this, client));
}

export async function getUser(client: Client): Promise<User> {
    return client.users.fetch(process.env.USER_ID);
}
