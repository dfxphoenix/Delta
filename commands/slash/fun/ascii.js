const { MessageEmbed } = require("discord.js");
const figlet = require("figlet");
const util = require("util");

module.exports = {
	name: 'ascii',
	description: 'convert text to ascii',
	permissions: ["VIEW_CHANNEL", "SEND_MESSAGES"],
	options: [
		{ description: 'Text to convert', name: 'text', required: false, type: 3 }
	],

	async execute(interaction) {
		const query = interaction.options.getString("text");
		const figletAsync = util.promisify(figlet);
		const embed = new MessageEmbed();

		if (!query || query.length > 20) {
			embed.setAuthor({ name: `${interaction.client.user.displayName} | Ascii`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
			embed.setColor(config.app.color);
			embed.setDescription(language.VALID_TEXT_CH + ` ${interaction.user.displayName}... ` + language.TRY_AGAIN + ` ❌`);
			embed.setTimestamp();
			embed.setFooter({ text: language.USED_BY + ` ${interaction.user.displayName}`, iconURL: `${interaction.user.displayAvatarURL()}` });
			return interaction.reply({ embeds: [embed] });
		}

		const rendered = await figletAsync(query);

		embed.setAuthor({ name: `${interaction.client.user.displayName} | Ascii`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
		embed.setColor(config.app.color);
		embed.setDescription("```" + rendered + "```");
		embed.setTimestamp();
		embed.setFooter({ text: language.USED_BY + ` ${interaction.user.displayName}`, iconURL: `${interaction.user.displayAvatarURL()}` });

		interaction.reply({ embeds: [embed] });
	},
};