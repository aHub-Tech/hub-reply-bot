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

import { env } from './env'

export function choice<Item = unknown>(arr?: Item[] | null) {
    if (!arr?.length) return null;
    return arr[Math.floor(Math.random() * arr.length)] ?? null;
}

export function chunk<Item = unknown>(arr: Item[], len: number) {
    const chunks : Array<Array<Item>> = [];
    let i = 0;

    while (i < arr.length) {
        chunks.push(arr.slice(i, i += len));
    }

    return chunks;
}

export function cmd(text: string, prefix: string) {
    if (!text) return '';
    return text.toLowerCase().replace(prefix, '').split(' ').shift() ?? '';
}

export function mention(text: string, user?: string) {
    return text.replace(/\<user\>/gi, user ?? '');
}

// add spaces when message is repeated on the same channel.
let lastMessage : {[key:string]:string} = {};
export function bypassAntiSpam(text: string, channel:string)
{
    if(text == (lastMessage[channel] ?? '')) {
        text += env.TWITCH_BYPASS_CHAR;
    }
    
    return lastMessage[channel] = text;
}

export enum DiscordEvent {
    Message = 'messageCreate',
    ClientReady = 'ready',
}

export enum TwitchEvent {
    Message = 'chat',
    ClientReady = 'join',
    ClientLogon = 'logon',
    ClientConnected = 'connected',
    ClientConnecting = 'connecting',
    ClientDisconnected = 'disconnected',
}