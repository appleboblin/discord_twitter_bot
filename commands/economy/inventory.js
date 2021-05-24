const economy = require('../../features/economy/economy');
const check = require('../../features/economy/inventory');
const logger = require('../../util/logger');
module.exports = {
  commands: ['inventory', 'inv'],
  description: 'check inventory',
  expectedArgs: '',
  minArgs: 0,
  maxArgs: 0,
  //requiredRoles: [`test`],
  //permissions: ['SEND_MESSAGES'],
  //permissionError = 'You do not have permission to run this command.',
  callback: async (message, args, text) => {
    const guildId = message.guild.id;
    const userId = message.author.id;
    const userTag = message.author.tag;
    const userName = message.author.username;
    const userNickname = message.member.nickname;
    let inventoryMenu = {
      embed: {
        color: 15277667,
        title: `**${userNickname}'s Inventory**`,
        thumbnail: {
          url: 'https://cdn.discordapp.com/attachments/835471079303544834/845921169642618890/Screen_Shot_2021-05-23_at_3.06.38_PM.png',
        },
        fields: [],
        footer: {
          icon_url:
            'https://cdn.discordapp.com/attachments/835471079303544834/846039122346377276/Screen_Shot_2021-05-23_at_10.57.00_PM.png',
          text: 'placeholder',
        },
      },
    };
    let inventory;
    try {
      const inv = await check.inventory(guildId, userId, 'normal');

      const pay = await economy.getCoins(guildId, userId);
      inventoryMenu.embed.footer.text = `Remaining Cock Coins: ${pay}`;
      // prepare result for menu
      inventory = inv.replace(/[,]/g, '\n').replace(/[:]/g, ': ');
    } catch {
      logger.error(`failed to open inventory`);
    } finally {
      // send info to menu
      inventoryMenu.embed.fields.push({
        name: `**Boxes**`,
        value: `\`\`\`${inventory}\`\`\``,
        inline: true,
      });
      message.channel.send(inventoryMenu);
    }
  },
};
