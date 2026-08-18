const { MessageEmbed } = require("discord.js");

module.exports = {
	name: 'captcha',
	aliases: ['ca'],
	utilisation: '{prefix}captcha [member]',
	permissions: ["VIEW_CHANNEL", "SEND_MESSAGES"],

	async execute(client, message, args) {
		let user = message.author;

		if (message.mentions.users.size) {
			user = message.mentions.users.first();
		} else if (args[0]) {
			user = message.guild.members.cache.find(member => 
				member.user.id === args[0] ||
				member.user.username.toLowerCase() === args[0].toLowerCase()
			);
		}
		const embed = new MessageEmbed();

		try {
			const res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=captcha&username=${user.username}&url=${user.displayAvatarURL({ size: 512, dynamic: true, format: 'png' })}`));
			const json = await res.json();
			const attachment = new Discord.MessageAttachment(json.message, 'captcha.png');
			embed.setAuthor({ name: `${client.user.displayName} | Captcha`, iconURL: `${client.user.displayAvatarURL()}` });
			embed.setColor(config.app.color);
			embed.setImage('attachment://captcha.png');
			embed.setTimestamp();
			embed.setFooter({ text: language.USED_BY + ` ${message.author.displayName}`, iconURL: `${message.author.displayAvatarURL()}` });
			message.channel.send({ embeds: [embed], files: [attachment] });
		} catch (err) {
			console.error(err);
			embed.setAuthor({ name: `${client.user.displayName} | Captcha`, iconURL: `${client.user.displayAvatarURL()}` });
			embed.setColor(config.app.color);
			embed.setDescription(language.THERE_WAS_AN_ERROR + ` ${interaction.user.displayName}... ` + language.TRY_AGAIN + ` ❌`);
			embed.setTimestamp();
			embed.setFooter({ text: language.USED_BY + ` ${message.author.displayName}`, iconURL: `${message.author.displayAvatarURL()}` });
			message.channel.send({ embeds: [embed] });
		}
	},
};