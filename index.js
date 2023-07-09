

const {
    REST
} = require('@discordjs/rest');
const {
    Routes
} = require('discord-api-types/v9');

const discordTranscripts = require('discord-html-transcripts');

const db = require('quick.db');



const { Client, MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');

const discordModals = require('discord-modals');
  const { Modal, TextInputComponent, showModal } = discordModals;

  

const { token,
    prefix,
     Owner,
      GuildId,
      help,
      dis,
      game,
      insta,
        logChannelId,
          BotStatusType, 
          BotStatusName,
          TicketMenEmojji1,
          TicketMenEmojji2,
          TicketMenEmojji3,
          TicketMenEmojji4,
          TicketImage,
          Admins,
          botId,
          textsend
       } = require('./config.json');
const client = new Client({ intents: [32767]});
const rest = new REST({ version: '10'}).setToken(token);

discordModals(client);

const commands = [
    {
        name: 'ping',
        description: 'نتي سيئ لاتشوف مايحتاج',
    },

    {
        name: 'dm-reminder',
        description: 'تذكير صاحب التذكرة',
        options: [
            {
                name: 'user',
                description: 'تذكير صاحب التذكرة',
                required: true,
                type: 6
            }
        ]
    },
    
];

(async () => {
    try {
        console.log('Started refreshing application {/} Commands.');


        await rest.put(Routes.applicationCommands(botId), {body: commands});

        console.log('Succesfully reloaded application {/} Commands.');
    } catch (error) {
        console.error(error)
    }
})();

client.on('ready', () => {
    client.user.setActivity({name: BotStatusName, type: BotStatusType})
})

client.on('interactionCreate', async interaction => {
    if(interaction.isCommand()) {
        if(interaction.commandName == 'ping') {
            interaction.reply({content: `**${client.ws.ping}**🏓`, ephemeral: true})
        }
    }



    if(interaction.isCommand()) {
        if(interaction.commandName == 'dm-reminder') {

            if(!Owner.includes(interaction.user.id)) {
                return interaction.reply({content: `ما تقدر`, ephemeral: true})
            }

            const user = interaction.options.getUser('user');

            const guild = client.guilds.cache.get(interaction.guildId);
            const chan = guild.channels.cache.get(interaction.channelId);
            const text = textsend;

            user.send(`**${text}** \n ${chan}`)

            const em = new MessageEmbed()
            .setDescription(`**تم ارسال رسالة التذكير لهذا الشخص ${user}**`)

            interaction.channel.send({ embeds: [em]})

            interaction.reply({content: `تم تذكير صاحب التذكرة السحبه`, ephemeral: true})
        }
        
    }
    
    
})

client.on('modalSubmit', async (modal) => {
    if (modal.customId === 'verification-modal') {

      const information = modal.getTextInputValue('cate');
      let cache = modal.guild.channels.cache.find(c => c.id == `${information}` && c.type == 'GUILD_CATEGORY')


      if(!cache) {
        return modal.reply({ content: 'ليس هناك كيتجوري بهذا الايدي', ephemeral: true})
      }
      modal.channel.setParent(cache)
      modal.reply({ content: 'تم', ephemeral: true})
    }
  });

process.on('unhandledRejection', (reason, p) => {
    console.log(' [antiCrash] :: Unhandled Rejection/Catch');
    console.log(reason, p);
});
process.on("uncaughtException", (err, origin) => {
    console.log(' [antiCrash] :: Uncaught Exception/Catch');
    console.log(err, origin);
}) 
process.on('uncaughtExceptionMonitor', (err, origin) => {
    console.log(' [antiCrash] :: Uncaught Exception/Catch (MONITOR)');
    console.log(err, origin);
});
process.on('multipleResolves', (type, promise, reason) => {
    console.log(' [antiCrash] :: Multiple Resolves');
    //console.log(type, promise, reason);
});
client.login(token)