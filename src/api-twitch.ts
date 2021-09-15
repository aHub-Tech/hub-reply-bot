import { Client } from 'tmi.js'
import { chunk, cmd, mention, TwitchEvent, bypassAntiSpam } from './utils';
import { env } from './env'

type twitchConfig = {
    triger: (command: string) => string | null
};

export default function connectToTwitch(config: twitchConfig) {
    const channels : Array<string> = env.TWITCH_CHANNELS.split(',');
    const clients : Array<Client> = [];
    
    /**
     * create multiple channels connections nodes
     * to keep the bot functional on everyone at the same time
     */
    chunk(channels, env.TWITCH_CLUSTER_SIZE).forEach((channelsChunk) => {
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
        client.on(TwitchEvent.Message, (channel, userstate, message, self) => {
            if (self) return;
            if (!message.startsWith(env.TWITCH_COMMAND_PREFIX)) return;

            // call command handler and get response
            const response = config.triger(cmd(message, env.TWITCH_COMMAND_PREFIX));
            
            // whitout response, don´t send anything
            if (!response) return;

            client.say(channel, bypassAntiSpam(mention(response, `@${userstate.username}`), channel));
        });
    });

    // twitch logs
    clients.forEach((client, index) => {
        client.on(TwitchEvent.ClientLogon, () => console.log(` > twitch node ${index + 1} logon on server!`));
        client.on(TwitchEvent.ClientConnected, (address, port) => console.log(` > twitch node ${index + 1} is connected!`));
        client.on(TwitchEvent.ClientConnecting, (address, port) => console.log(` > twitch node ${index + 1} connecting...`));
        client.on(TwitchEvent.ClientDisconnected, (reason) => console.log(` > twitch node ${index + 1} is disconnected!`));
        client.on(TwitchEvent.ClientReady, (channel, username, self) => console.log(` > twitch node ${index + 1} join in the ${channel} channel.`));
    }); 

    // start all nodes
    clients.forEach((client) => {
        client.connect();
    });
}