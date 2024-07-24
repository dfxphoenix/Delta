const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const canvacord = require("canvacord");

module.exports = {
	name: 'triggered',
	aliases: ['tg'],
	utilisation: '{prefix}triggered [member]',
	permissions: ["VIEW_CHANNEL", "SEND_MESSAGES"],

	async execute(client, message, args) {
		let user = message.author;

		if (message.mentions.users.size) {
			user = message.mentions.users.first();
		} else if (args[0]) {
			user = message.guild.members.cache.find(member => 
				member.user.id === args[0] ||
				member.user.username.toLowerCase() === args[0].toLowerCase()
			);
		}
		const embed = new MessageEmbed();

		try {
			const buffer = await canvacord.Canvas.triggered(query.displayAvatarURL({ size: 512, dynamic: true, format: 'png' }));
			const attachment = new Discord.MessageAttachment(buffer, 'triggered.png');
			embed.setAuthor({ name: `${client.user.displayName} | CapTriggeredtcha`, iconURL: `${client.user.displayAvatarURL()}` });
			embed.setColor(config.app.color);
			embed.setImage('attachment://triggered.png');
			embed.setTimestamp();
			embed.setFooter({ text: language.USED_BY + ` ${message.author.displayName}`, iconURL: `${message.author.displayAvatarURL()}` });
			message.channel.send({ embeds: [embed], files: [attachment] });
		} catch (err) {
			console.error(err);
			embed.setAuthor({ name: `${client.user.displayName} | Triggered`, iconURL: `${client.user.displayAvatarURL()}` });
			embed.setColor(config.app.color);
			embed.setDescription(language.THERE_WAS_AN_ERROR + ` ${interaction.user.displayName}... ` + language.TRY_AGAIN + ` ❌`);
			embed.setTimestamp();
			embed.setFooter({ text: language.USED_BY + ` ${message.author.displayName}`, iconURL: `${message.author.displayAvatarURL()}` });
			message.channel.send({ embeds: [embed] });
		}
	},
};