import { client, Client } from 'tmi.js'
import { chunk, cmd } from './utils';
import { env } from './env'

type twitchConfig = {
    limiter: number,
    triger: (command: string) => string | null
};

export default function connectToTwitch(config: twitchConfig) {
    const channels : Array<string> = env.TWITCH_CHANNELS.split(',');
    const clients : Array<Client> = [];
    
    /**
     * create multiple channels connections nodes
     * to keep the bot functional on everyone at the same time
     */
    chunk(channels, config.limiter).forEach((channelsChunk) => {
        clients.push(
            new Client({ 
                options: { 
                    debug: env.TWITCH_DEBUG
                },
                connection: {
                    reconnect: true,
                    secure: true
                },
                identity: {
                    username: env.TWITCH_BOT_USERNAME,
                    password: env.TWITCH_OAUTH_TOKEN
                },
                channels: channelsChunk
            })
        );
    });
    
    clients.forEach((client) => {
        client.on('message', (channel, tags, message, self) => {
            if (self) return;
            if (!message.startsWith(env.TWITCH_COMMAND_PREFIX)) return;

            // call command handler and get response
            let response = config.triger(cmd(message));
            
            // whitout response, don´t send anything
            if (!response) return;

            client.say(channel, response);
        });
    });

    // twitch logs
    clients.forEach((client, index) => {
        client.on("logon", () => console.log(` > twitch node ${index + 1} logon on server!`));
        client.on("connected", (address, port) => console.log(` > twitch node ${index + 1} is connected!`));
        client.on("connecting", (address, port) => console.log(` > twitch node ${index + 1} connecting...`));
        client.on("disconnected", (reason) => console.log(` > twitch node ${index + 1} is disconnected!`));
    }); 

    // start all nodes
    clients.forEach((client) => {
        client.connect();
    });
}