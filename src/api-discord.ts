import { Client, Intents } from 'discord.js';
import { cmd, mention, DiscordEvent } from './utils'
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

    client.on(DiscordEvent.Message, (message) => {
        if (message.author.bot) return;
        if (!message.content.startsWith(env.DISCORD_COMMAND_PREFIX)) return;

        // call command handler and get response
        const response = config.triger(cmd(message.content));
        
        // whitout response, don´t send anything
        if (!response) return;

        // reply message with response
        message.channel.send({
            content: mention(response, `<@${message.author.id}>`),
            reply: {
                messageReference: message
            }
        });
    });

    client.on(DiscordEvent.ClientReady, () => {
        console.log(' > Discord is connected.');
    });

    client.login(env.DISCORD_SECRET_TOKEN);
}
