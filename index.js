require('dotenv').config();
const child_process = require('child_process');
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });


const DISCORD_TAKBOT_TOKEN = process.env.DISCORD_TAKBOT_TOKEN;
const DISCORD_TAKBOT_IP_CHANNEL_ID = process.env.DISCORD_TAKBOT_IP_CHANNEL_ID;
const DISCORD_TAKBOT_SERVER_NAME = process.env.DISCORD_TAKBOT_SERVER_NAME


process.on('unhandledRejection', p => {
}); // Do nothing


function getPublicIPv4() {
    let cmd = `ip -4 addr | grep -oP '(?<=inet\\s)\\d+(\\.\\d\\d+){3}'`;
    return child_process.execSync(cmd).toString().trim();
}

async function sendIPAddressAndExit() {
    let msg = `${DISCORD_TAKBOT_SERVER_NAME} is online at ${getPublicIPv4()}`;
    console.log(msg);
    try {
        let channel = client.channels.cache.get(DISCORD_TAKBOT_IP_CHANNEL_ID);
        channel.send(msg).then(() => {
            process.exit(0); // Success
        });
    }
    catch (error) {
        console.error("Error sending message:");
        console.error(error);
        process.exit(1); // Failure
    }
}

client.on('ready', () => {
    tag = client.user.tag;
    console.log('[ Starting client ]')
    console.log('> Logged in as ' + tag);
    client.user.setStatus('available'); // Can be 'available', 'idle', 'dnd', or 'invisible'
    console.log(`> ${tag}'s status is set to available`);

    sendIPAddressAndExit();
});

client.login(DISCORD_TAKBOT_TOKEN);
