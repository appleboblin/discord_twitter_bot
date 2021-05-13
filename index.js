// Requirements
const Discord = require('discord.js');
// Set Discord client
const client = new Discord.Client();
// require custom files
const config = require('./config.json');
const command = require('./function/command');
const welcomeMessage = require('./function/welcome-message');
const privateMessage = require('./function/private-message');

// Active when Discord client is ready
client.on('ready', () => {
  console.log('client ready');
  // test message
  command(client, ['no', 'test'], (message) => {
    message.channel.send('hi');
  });
  // Get info of servers the bot is in
  command(client, 'server', (message) => {
    client.guilds.cache.forEach((guild) => {
      message.channel.send(`${guild.name} gotz ${guild.memberCount} members`);
    });
  });
  //Clear recent messages of a channel
  command(client, ['cc', 'clearchannel'], (message) => {
    if (message.member.hasPermission('ADMINISTRATOR'))
      message.channel.messages.fetch().then((results) => {
        message.channel.bulkDelete(results);
      });
  });
  // Set new Status
  command(client, 'status', (message) => {
    const content = message.content.replace('./status ', '');

    client.user.setPresence({
      status: 'available',
      activity: {
        name: content,
        type: 'LISTENING',
      },
    });
  });
  //Private Message
  privateMessage(client, 'Ding', 'dong');
  // Welcome message
  welcomeMessage(
    client,
    '842397223735525407',
    'Biggie poopie Jojo\nSecond Line\nThird Line :exploding_head:\n4 is not this ',
    [
      // emoji reactions
      '😇',
      '🙃',
      '💩',
      '🤯',
      '<:YEP:715965999450554429>',
    ]
  );
  // Set launch status
  client.user.setPresence({
    status: 'available',
    activity: {
      name: 'Default',
      type: 'PLAYING',
    },
  });
});

// Login Discord
client.login(config.token);