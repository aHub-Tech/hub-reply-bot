import { Client, Intents } from 'discord.js';
import { cmd } from './utils'
import { env } from './env'

type discordConfig = {
    triger: (command: string) => string | null
};

const intents = [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGES
];

export default function connectToDiscord (config: discordConfig)
{
    const client = new Client({intents});

    client.on('messageCreate', (message) => {
        if (message.author.bot) return;
        if (!message.content.startsWith(env.DISCORD_COMMAND_PREFIX)) return;

        // call command handler and get response
        let response = config.triger(cmd(message.content));
        
        // whitout response, don´t send anything
        if (!response) return;

        // reply message with response
        message.channel.send({
            content: response,
            reply: {
                messageReference: message
            }
        });
    });

    client.on('ready', () => {
        console.log(' > Discord is connected.');
    });

    client.login(env.DISCORD_SECRET_TOKEN);
}
