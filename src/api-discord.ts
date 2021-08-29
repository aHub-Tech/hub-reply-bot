import { Client, Intents } from 'discord.js';

type discordConfig = {
    token: string,
    prefix: string,
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
        if (!message.content.startsWith(config.prefix)) return;

        // get command called
        let command = message.content.toLowerCase().slice(1).split(' ').shift() ?? '';

        // call command handler and get response
        let response = config.triger(command);
        
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
        console.log(' > Discord connected.');
    });

    client.login(config.token);
}