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