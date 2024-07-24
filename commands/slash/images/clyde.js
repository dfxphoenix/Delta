const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
	name: 'clyde',
	description: 'generate clyde image',
	permissions: ["VIEW_CHANNEL", "SEND_MESSAGES"],
	options: [
		{ description: 'Text to clyde', name: 'text', required: true, type: 3 }
	],

	async execute(interaction) {
		const query = interaction.options.getString("text");
		const embed = new MessageEmbed();

		try {
			const res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=clyde&text=${query}`));
			const json = await res.json();
			const attachment = new Discord.MessageAttachment(json.message, 'clyde.png');
			embed.setAuthor({ name: `${interaction.client.user.displayName} | Clyde`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
			embed.setColor(config.app.color);
			embed.setImage('attachment://clyde.png');
			embed.setTimestamp();
			embed.setFooter({ text: language.USED_BY + ` ${interaction.user.displayName}`, iconURL: `${interaction.user.displayAvatarURL()}` });
			interaction.reply({ embeds: [embed], files: [attachment] });
		} catch (err) {
			console.error(err);
			embed.setAuthor({ name: `${interaction.client.user.displayName} | Clyde`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
			embed.setColor(config.app.color);
			embed.setDescription(language.THERE_WAS_AN_ERROR + ` ${interaction.user.displayName}... ` + language.TRY_AGAIN + ` ❌`);
			embed.setTimestamp();
			embed.setFooter({ text: language.USED_BY + ` ${interaction.user.displayName}`, iconURL: `${interaction.user.displayAvatarURL()}` });
			interaction.reply({ embeds: [embed] });
		}
	},
};