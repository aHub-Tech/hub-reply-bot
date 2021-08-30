import { choice } from './utils';
import { env, loadEnv } from './env'
import fetchCommands from './fetch-commands'
import connectToTwitch from './api-twitch'
import connectToDiscord from './api-discord'

loadEnv();
const myCommands = fetchCommands();

function handleCommand(command: string): string | null {
    return choice(myCommands[command]); 
}

connectToTwitch({
    limiter: 5,
    triger: handleCommand
});

connectToDiscord({
    triger: handleCommand
});
