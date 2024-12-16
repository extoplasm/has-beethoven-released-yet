import { getToken, getLatestAlbum, isWithinThirtyDays } from './src/spotify.js';
import { Client, Events, GatewayIntentBits } from 'discord.js'
const client = new Client({ 
    presence: { activities: [{ name: "wondering when beethoven will release", type: "LISTENING"}], status: "idle"}, 
    intents: [ 
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});
import { configDotenv } from 'dotenv';
configDotenv()

client.once(Events.ClientReady, _client => {
    console.log('logged in')
})

client.on(Events.MessageCreate, async msg => {
    if (msg.author.bot) return;

    if (msg.content.includes('<@1318019987730071562>')) {
        getToken().then(response => {
            getLatestAlbum(response.access_token).then(album => {
                if(isWithinThirtyDays(Date.parse(album.items[0].release_date))) {
                    msg.channel.send(`yes, beethovens latest album is \`${album.items[0].name}\`, released on \`${album.items[0].release_date}\``)
                }
                else {
                    msg.channel.send('nah not yet')
                }
            }).catch((err) => { console.log(err); });
        }).catch((err) => { console.log(err); });
    }
})

console.log('logging in')
client.login(process.env.token)