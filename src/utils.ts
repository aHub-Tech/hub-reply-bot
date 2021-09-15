export function choice<Item = unknown>(arr?: Item[] | null) {
    if (!arr?.length) return null;
    return arr[Math.floor(Math.random() * arr.length)] ?? null;
}

export function chunk<Item = unknown>(arr: Item[], len: number) {
    const chunks : Array<Array<Item>> = [];
    let i = 0;

    while (i < arr.length) {
        chunks.push(arr.slice(i, i += arr.length));
    }

    return chunks;
}

export function cmd(text: string) {
    if (!text) return '';
    return text.toLowerCase().slice(1).split(' ').shift() ?? '';
}

export function mention(text: string, user?: string) {
    return text.replace(/\<user\>/gi, user ?? '');
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
