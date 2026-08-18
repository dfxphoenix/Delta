const { MessageEmbed } = require("discord.js");
const figlet = require("figlet");
const util = require("util");

module.exports = {
	name: 'ascii',
	aliases: ['aci'],
	utilisation: '{prefix}ascii [text]',
	permissions: ["VIEW_CHANNEL", "SEND_MESSAGES"],

	async execute(client, message, args) {
		const figletAsync = util.promisify(figlet);
		const embed = new MessageEmbed();

		if (!args[0] || args[0].length > 20) {
			embed.setAuthor({ name: `${client.user.displayName} | Ascii`, iconURL: `${client.user.displayAvatarURL()}` });
			embed.setColor(config.app.color);
			embed.setDescription(language.VALID_TEXT_CH + ` ${message.author.displayName}... ` + language.TRY_AGAIN + ` ❌`);
			embed.setTimestamp();
			embed.setFooter({ text: language.USED_BY + ` ${message.author.displayName}`, iconURL: `${message.author.displayAvatarURL()}` });
			return message.channel.send({ embeds: [embed] });
		}

		const rendered = await figletAsync(query);

		embed.setAuthor({ name: `${client.user.displayName} | Ascii`, iconURL: `${client.user.displayAvatarURL()}` });
		embed.setColor(config.app.color);
		embed.setDescription("```" + rendered + "```");
		embed.setTimestamp();
		embed.setFooter({ text: language.USED_BY + ` ${message.author.displayName}`, iconURL: `${message.author.displayAvatarURL()}` });

		message.channel.send({ embeds: [embed] });
	},
};