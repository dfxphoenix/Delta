# Delta

A Discord bot for image effects and utility commands. Delta can generate avatar-based images, render ASCII text, flip a coin and create a Google search link. An optional Express/EJS website displays the bot's identity and statistics.

## Development

Install Node.js 22 or later and npm. Image commands use Canvacord and its native image-processing dependencies.

```sh
npm ci
```

Copy the configuration example. In PowerShell:

```powershell
Copy-Item 'config.js.example' 'config.js'
```

On Linux or macOS:

```sh
cp config.js.example config.js
```

Set the Discord bot token, application ID and instance settings in `config.js`, then start from the repository root:

```sh
npm start
```

Use a separate Discord application and guild for development. Application commands are registered when the bot becomes ready.

## Configuration

- `app.slashCommands` and `app.px`: slash-command mode or the text-command prefix
- `app.token` and `app.id`: Discord credentials and application identity
- `app.playing`, `app.slogan`, `app.owner` and `app.color`: presence and website branding
- `app.language` and `app.autoLanguage`: default language and automatic locale selection
- `app.website`: website listener address, port and enabled state
- `app.privateMode`: hide public website invite/statistics sections and disable `/api`
- `rolesGroup`: optional role-name restrictions for selected commands

Slash commands are enabled by default. Text commands are stored separately under `commands/normal/`; review the client intents and Discord permissions before changing command mode. `privateMode` changes the website, not the bot's authorization model.

English and Romanian translations are in `languages/`. Copy `en_US.json` to a new locale filename when adding a language, preserving the existing keys. `config.js` is excluded from Git; keep credentials there rather than in the example file.

## Commands

| Commands | Purpose |
| --- | --- |
| `avatar` | Display a user's avatar |
| `captcha`, `clyde` | Generate styled images |
| `facepalm`, `invert`, `jail`, `triggered`, `wasted` | Apply image effects |
| `ascii` | Render text as ASCII art |
| `flip` | Flip a coin |
| `google` | Generate a Google search link |
| `help`, `ping` | Show available commands and connection latency |

Use `/` in slash-command mode or the configured prefix in text-command mode. Image commands need access to their source images and permission to send their results in the target channel. Enabled role groups can restrict commands further.

## Deployment

Run under a dedicated account with the repository root as the working directory. Use a process supervisor for restarts and capture standard output and errors in the host's logs.

The example enables the website on `127.0.0.1:80`. Choose a non-privileged port for the bot process and publish the site through an HTTPS reverse proxy. Disable `app.website.enabled` when no website is needed; running the bot as root is not required.

The root page displays the bot's Discord identity and statistics. `/api` returns `guilds`, `users` and `channels` when private mode is disabled. The website is informational, not an administration dashboard.

## Diagnostics

If installation fails in an image-processing dependency, inspect the native-module installation output for the host's missing build requirements. For command failures, check image availability, bot permissions and the console output.

Only `npm start` is configured; there are no npm test, build or formatting scripts. Verify image output, role restrictions, translations and the optional website in a development guild before deploying changes.
