# Butler!

A personal Discord butler :DDD I mostly made this to have something that can give me updates through a Discord DM.

> NOTE: Still a WIP

## Development

Clone the repo and run `yarn install` to get started. You must also [create a Discord Application with a Bot](https://discord.com/developers/docs/getting-started) in the Discord Developer Console.

```
yarn install - Installs the required files
yarn start - Starts the bot
yarn dev - Starts the bot with hot reloading when files are changed
yarn deploy - Deploys all commands globally
```

**IMPORTANT NOTE: You must have the bot in a server that you are in, even though the bot communicates strictly through direct messages.** This is due to Discord's relationship policy. If you do not do this, the bot will error upon trying to send the start message.

### Configuration

To run the bot, you will need to set up a configuration `.env` file in the project root directory with the following content:

```
TOKEN="[Discord bot token]"
CLIENT_ID="[Discord bot application ID (18 digit number)"
USER_ID="[Discord user ID]"
NEWS_API="[Key from news API]"
```

To get the `NEWS_API` env key, go to the [News API Site](https://newsapi.org/) to register for a free key (100 requests per day).

## Todo

Here is a list of things I want my bot to do (will be updated!):

- [x] Configuration command
- [x] Daily news feed
- [x] xkcd daily comic
- [ ] Github notification feed (https://docs.github.com/en/rest/activity/notifications#list-notifications-for-the-authenticated-user)
