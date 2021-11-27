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
    triger: handleCommand
});

connectToDiscord({
    triger: handleCommand
});
