/* eslint-disable-next-line @typescript-eslint/no-var-requires */
require('dotenv').config();
import 'module-alias/register';
import { SapphireClient } from '@sapphire/framework';

const bot = new SapphireClient({
	defaultPrefix: 'f;',
	presence: {
		activity: {
			name: 'f;help',
			type: 'LISTENING'
		}
	}
});

bot.login(process.env.TOKEN)
	.catch(err => console.error(err));
