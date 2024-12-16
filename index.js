import { getToken, getLatestAlbum, isWithinThirtyDays } from './src/spotify.js';
import { Client, Events, GatewayIntentBits } from 'discord.js';
import 'dotenv/config';

const client = new Client({ 
    presence: { activities: [{ name: "wondering when beethoven will release", type: "LISTENING"}], status: "idle"}, 
    intents: [ 
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

client.once(Events.ClientReady, _client => {
    console.log('logged in');
})

client.on(Events.MessageCreate, async msg => {
    if (msg.author.bot) return;

    if (msg.mentions.has(client.user)) {
        try {
            const token = await getToken();
            const album = await getLatestAlbum(token);
            if(isWithinThirtyDays(Date.parse(album.items[0].release_date))) {
                msg.channel.send(`yes, beethovens latest album is \`${album.items[0].name}\`, released on <t:${Math.floor(Date.parse(album.items[0].release_date)/1000)}:D>`);
            }
            else {
                msg.channel.send('nah not yet');
            }
        }
        catch(err) {
            console.error(err);
        }
    }
})

console.log('logging in');
client.login(process.env.token);
