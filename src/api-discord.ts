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

import { Client, Intents } from 'discord.js';
import { cmd, mention, DiscordEvent } from './utils'
import { env } from './env'

type discordConfig = {
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

    client.on(DiscordEvent.Message, (message) => {
        if (message.author.bot) return;
        if (!message.content.startsWith(env.DISCORD_COMMAND_PREFIX)) return;

        // call command handler and get response
        const response = config.triger(cmd(message.content, env.DISCORD_COMMAND_PREFIX));
        
        // whitout response, don´t send anything
        if (!response) return;

        // reply message with response
        message.channel.send({
            content: mention(response, `<@${message.author.id}>`),
            reply: {
                messageReference: message
            }
        });
    });

    client.on(DiscordEvent.ClientReady, () => {
        console.log(' > Discord is connected.');
    });

    client.login(env.DISCORD_SECRET_TOKEN);
}
