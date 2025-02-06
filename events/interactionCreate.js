const { MessageEmbed } = require('discord.js');

module.exports = (client, interaction) => {
	if (config.app.slashCommands && config.app.slashCommands !== "") {

		if (interaction.isCommand()) {

			if (!interaction.guild) {
				return interaction.reply(language.ONLY_GUILD + "!");
			}

			const embed = new MessageEmbed();

			const command = client.commands.find(cmd => cmd.name.toLowerCase() == interaction.commandName);

			if (!command) return;

			if (config.app.autoLanguage) {
				language = languages[functions.getLanguage(config, interaction)];
			}

			if (command && command.permissions && !functions.Permission(interaction, command.permissions, command.name)) return interaction.reply({ content: language.I_DO_NOT_HAVE_PERMISSION + "!", ephemeral: true });

			const roles = config.rolesGroup;

			for (role in roles) {

				if (command && roles[role].enabled && roles[role].commands.includes(command.name) && !interaction.member.permissions.has("ADMINISTRATOR")) {

					var rolearray = [];

					for (var y = 0; y < roles[role].roleName.length; y++) {
						if (roles[role].roleName[y]) {
							rolearray.push(interaction.guild.roles.cache.find(x => x.name === roles[role].roleName[y]).id);
						} else {
							return interaction.reply({ content: language.ROLE + ` ${roles[role].roleName.join(', ')} ` + language.NOT_EXIST + `.`, ephemeral: true });
						}
					}

					if (!interaction.member._roles.some(v => rolearray.includes(v))) {
						embed.setAuthor({ name: `${client.user.username} | Role`, iconURL: `${client.user.displayAvatarURL()}` });
						embed.setColor(config.app.color);
						embed.setDescription(language.THIS_COMMAND + ` ${roles[role].roleName.join(', ')} ` + language.ROLE_ON_SERVER + ` ${interaction.author}... ` + language.TRY_AGAIN + ` ❌`);
						embed.setTimestamp();
						embed.setFooter({ text: language.USED_BY + ` ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` });
						return interaction.reply({ embeds: [embed] });
					}
				}
			}

			try {
				command.execute(interaction);
			} catch (error) {
				if (error) console.log(error);
				interaction.reply({ content: language.THERE_WAS_AN_ERROR + "!", ephemeral: true });
			}
		}
	}
};
