
import { EnvType, load } from 'ts-dotenv';
import { config } from 'dotenv';
 
export type Env = EnvType<typeof schema>;
 
export const schema = {
    DISCORD_COMMAND_PREFIX: String,
    DISCORD_SECRET_TOKEN: String
};
 
export let env: Env;
 
export function loadEnv(): void {
    console.log('[!] loading hubble bot...');

    config();

    env = load(schema);
}