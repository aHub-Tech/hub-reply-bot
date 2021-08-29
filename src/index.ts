import { choice } from './utils';
import { env, loadEnv } from './env'
import fetchCommands from './fetch-commands'
import connectToDiscord from './api-discord'

loadEnv();
const myCommands = fetchCommands();

function handleCommand(command: string): string | null {
    return choice(myCommands[command]); 
}

connectToDiscord({
    token: env.DISCORD_SECRET_TOKEN,
    prefix: env.DISCORD_COMMAND_PREFIX,
    triger: handleCommand
});
