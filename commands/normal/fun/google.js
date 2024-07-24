const { MessageEmbed } = require("discord.js");

module.exports = {
	name: 'google',
	aliases: ['gl'],
	utilisation: '{prefix}google [question]',
	permissions: ["VIEW_CHANNEL", "SEND_MESSAGES"],

	execute(client, message, args) {
		const encodedQuestion = query.replace(/[' '_]/g, "+");
		const embed = new MessageEmbed();

		if (!args[0]) {
			embed.setAuthor({ name: `${client.user.displayName} | Google`, iconURL: `${client.user.displayAvatarURL()}` });
			embed.setColor(config.app.color);
			embed.setDescription(language.VALID_TEXT + ` ${message.author.displayName}... ` + language.TRY_AGAIN + ` ❌`);
			embed.setTimestamp();
			embed.setFooter({ text: language.USED_BY + ` ${message.author.displayName}`, iconURL: `${message.author.displayAvatarURL()}` });
			return message.channel.send({ embeds: [embed] });
		}

		embed.setAuthor({ name: `${client.user.displayName} | Google`, iconURL: `${client.user.displayAvatarURL()}` });
		embed.setColor(config.app.color);
		embed.setDescription(`https://google.com/search?q=${encodedQuestion}`);
		embed.setTimestamp();
		embed.setFooter({ text: language.USED_BY + ` ${message.author.displayName}`, iconURL: `${message.author.displayAvatarURL()}` });

		message.channel.send({ embeds: [embed] });
	},
};