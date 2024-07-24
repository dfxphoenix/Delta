const { MessageEmbed } = require("discord.js");

module.exports = {
	name: 'google',
	description: 'generate Google link',
	permissions: ["VIEW_CHANNEL", "SEND_MESSAGES"],
	options: [
		{ description: 'Question to generate', name: 'question', required: true, type: 3 }
	],

	execute(interaction) {
		const query = interaction.options.getString("question");
		const encodedQuestion = query.replace(/[' '_]/g, "+");
		const embed = new MessageEmbed();

		embed.setAuthor({ name: `${interaction.client.user.displayName} | Google`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
		embed.setColor(config.app.color);
		embed.setDescription(`https://google.com/search?q=${encodedQuestion}`);
		embed.setTimestamp();
		embed.setFooter({ text: language.USED_BY + ` ${interaction.user.displayName}`, iconURL: `${interaction.user.displayAvatarURL()}` });

		interaction.reply({ embeds: [embed] });
	},
};