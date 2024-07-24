const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
	name: 'clyde',
	aliases: ['cl'],
	utilisation: '{prefix}clyde [text]',
	permissions: ["VIEW_CHANNEL", "SEND_MESSAGES"],

	async execute(client, message, args) {
		const embed = new MessageEmbed();

		if (!args[0]) {
			embed.setAuthor({ name: `${client.user.displayName} | Clyde`, iconURL: `${client.user.displayAvatarURL()}` });
			embed.setColor(config.app.color);
			embed.setDescription(language.VALID_TEXT + ` ${message.author.displayName}... ` + language.TRY_AGAIN + ` ❌`);
			embed.setTimestamp();
			embed.setFooter({ text: language.USED_BY + ` ${message.author.displayName}`, iconURL: `${message.author.displayAvatarURL()}` });
			return message.channel.send({ embeds: [embed] });
		}

		try {
			const res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=clyde&text=${args[0]}`));
			const json = await res.json();
			const attachment = new Discord.MessageAttachment(json.message, 'clyde.png');
			embed.setAuthor({ name: `${client.user.displayName} | Clyde`, iconURL: `${client.user.displayAvatarURL()}` });
			embed.setColor(config.app.color);
			embed.setImage('attachment://clyde.png');
			embed.setTimestamp();
			embed.setFooter({ text: language.USED_BY + ` ${message.author.displayName}`, iconURL: `${message.author.displayAvatarURL()}` });
			message.channel.send({ embeds: [embed], files: [attachment] });
		} catch (err) {
			console.error(err);
			embed.setAuthor({ name: `${client.user.displayName} | Clyde`, iconURL: `${client.user.displayAvatarURL()}` });
			embed.setColor(config.app.color);
			embed.setDescription(language.THERE_WAS_AN_ERROR + ` ${interaction.user.displayName}... ` + language.TRY_AGAIN + ` ❌`);
			embed.setTimestamp();
			embed.setFooter({ text: language.USED_BY + ` ${message.author.displayName}`, iconURL: `${message.author.displayAvatarURL()}` });
			message.channel.send({ embeds: [embed] });
		}
	},
};