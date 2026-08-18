const { MessageEmbed } = require("discord.js");

module.exports = {
	name: 'avatar',
	aliases: ['av'],
	utilisation: '{prefix}avatar [member]',
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

		const avatarURL = user.displayAvatarURL({ size: 512, dynamic: true, format: 'png' });
		const attachment = avatarURL;
		const embed = new MessageEmbed();

		embed.setAuthor({ name: `${client.user.displayName} | Avatar`, iconURL: `${client.user.displayAvatarURL()}` });
		embed.setColor(config.app.color);
		embed.setImage(attachment);
		embed.setTimestamp();
		embed.setFooter({ text: language.USED_BY + ` ${message.author.displayName}`, iconURL: `${message.author.displayAvatarURL()}` });

		message.channel.send({ embeds: [embed] });
	},
};