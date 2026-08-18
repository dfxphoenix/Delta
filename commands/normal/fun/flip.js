const { MessageEmbed } = require("discord.js");

module.exports = {
	name: 'flip',
	aliases: ['fp'],
	utilisation: '{prefix}flip',
	permissions: ["VIEW_CHANNEL", "SEND_MESSAGES"],

	execute(client, message) {
		const embed = new MessageEmbed();

		const isHeads = Math.random() > 0.5;

		embed.setAuthor({ name: `${client.user.displayName} | Flip`, iconURL: `${client.user.displayAvatarURL()}` });
		embed.setColor(config.app.color);
		embed.setDescription(isHeads ? language.HEADS : language.TAILS);
		embed.setTimestamp();
		embed.setFooter({ text: language.USED_BY + ` ${message.author.displayName}`, iconURL: `${message.author.displayAvatarURL()}` });

		message.channel.send({ embeds: [embed] });
	},
};