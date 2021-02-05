/* eslint-disable-next-line @typescript-eslint/no-var-requires */
require('dotenv').config();
import 'module-alias/register';

import { EnceladusClient } from './lib/EnceladusClient';

const bot = new EnceladusClient({
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
