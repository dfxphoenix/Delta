const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
	name: 'captcha',
	description: 'generate captcha image',
	permissions: ["VIEW_CHANNEL", "SEND_MESSAGES"],
	options: [
		{ description: 'Name of member', name: 'member', required: false, type: 6 }
	],

	async execute(interaction) {
		let query = await interaction.options.getMember("member");
		if (!query) query = interaction.member.user;
		const embed = new MessageEmbed();

		try {
			const res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=captcha&username=${query.username}&url=${query.displayAvatarURL({ size: 512, dynamic: true, format: 'png' })}`));
			const json = await res.json();
			const attachment = new Discord.MessageAttachment(json.message, 'captcha.png');
			embed.setAuthor({ name: `${interaction.client.user.displayName} | Captcha`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
			embed.setColor(config.app.color);
			embed.setImage('attachment://captcha.png');
			embed.setTimestamp();
			embed.setFooter({ text: language.USED_BY + ` ${interaction.user.displayName}`, iconURL: `${interaction.user.displayAvatarURL()}` });
			interaction.reply({ embeds: [embed], files: [attachment] });
		} catch (err) {
			console.error(err);
			embed.setAuthor({ name: `${interaction.client.user.displayName} | Captcha`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
			embed.setColor(config.app.color);
			embed.setDescription(language.THERE_WAS_AN_ERROR + ` ${interaction.user.displayName}... ` + language.TRY_AGAIN + ` ❌`);
			embed.setTimestamp();
			embed.setFooter({ text: language.USED_BY + ` ${interaction.user.displayName}`, iconURL: `${interaction.user.displayAvatarURL()}` });
			interaction.reply({ embeds: [embed] });
		}
	},
};