const { MessageEmbed } = require("discord.js");

module.exports = {
	name: 'avatar',
	description: 'generate avatar image',
	permissions: ["VIEW_CHANNEL", "SEND_MESSAGES"],
	options: [
		{ description: 'Name of member', name: 'member', required: false, type: 6 }
	],

	async execute(interaction) {
		let query = await interaction.options.getMember("member");
		if (!query) query = interaction.member.user;
		const avatarURL = query.displayAvatarURL({ size: 512, dynamic: true, format: 'png' });
		const attachment = avatarURL;
		const embed = new MessageEmbed();

		embed.setAuthor({ name: `${interaction.client.user.displayName} | Avatar`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
		embed.setColor(config.app.color);
		embed.setImage(attachment);
		embed.setTimestamp();
		embed.setFooter({ text: language.USED_BY + ` ${interaction.user.displayName}`, iconURL: `${interaction.user.displayAvatarURL()}` });

		interaction.reply({ embeds: [embed] });
	},
};