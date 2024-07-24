const { MessageEmbed } = require("discord.js");

module.exports = {
	name: 'flip',
	description: 'roll dice',
	permissions: ["VIEW_CHANNEL", "SEND_MESSAGES"],

	execute(interaction) {
		const embed = new MessageEmbed();

		const isHeads = Math.random() > 0.5;

		embed.setAuthor({ name: `${interaction.client.user.displayName} | Flip`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
		embed.setColor(config.app.color);
		embed.setDescription(isHeads ? language.HEADS : language.TAILS);
		embed.setTimestamp();
		embed.setFooter({ text: language.USED_BY + ` ${interaction.user.displayName}`, iconURL: `${interaction.user.displayAvatarURL()}` });

		interaction.reply({ embeds: [embed] });
	},
};