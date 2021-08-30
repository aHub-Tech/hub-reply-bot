
import { EnvType, load } from 'ts-dotenv';
import { config } from 'dotenv';
 
export type Env = EnvType<typeof schema>;
 
export const schema = {
    DISCORD_COMMAND_PREFIX: String,
    DISCORD_SECRET_TOKEN: String,

    TWITCH_COMMAND_PREFIX: String,
    TWITCH_BOT_USERNAME: String,
    TWITCH_OAUTH_TOKEN: String,
    TWITCH_CHANNELS: String,
    TWITCH_DEBUG: {
        type: Boolean,
        default: false
    }
};
 
export let env: Env;
 
export function loadEnv(): void {
    console.log('[!] loading hubble bot...');

    config();   

    env = load(schema);
}