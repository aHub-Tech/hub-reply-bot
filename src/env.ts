/**
 * Simple random reply chatbot for twitch and discord. 
 * Copyright (C) 2021  RodrigoDornelles
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

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
    TWITCH_BYPASS_CHAR: {
        type: String,
        default: '.'
    },
    TWITCH_CLUSTER_SIZE: {
        type: Number,
        default: 5
    },
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