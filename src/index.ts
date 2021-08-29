import { load } from 'ts-dotenv';
import { config } from 'dotenv';
import { choice } from './utils';
import fetchCommands from './fetch-commands'
import connectToDiscord from './api-discord'

config();

const myCommands = fetchCommands();

const env = load({
    DISCORD_COMMAND_PREFIX: String,
    DISCORD_SECRET_TOKEN: String
});

function handleCommand(command: string): string | null {
    return choice(myCommands[command]); 
}

connectToDiscord({
    token: env.DISCORD_SECRET_TOKEN,
    prefix: env.DISCORD_COMMAND_PREFIX,
    triger: handleCommand
});
