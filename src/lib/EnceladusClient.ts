import { SapphireClient } from '@sapphire/framework';
import { ClientOptions } from 'discord.js';

import '@sapphire/plugin-i18next/register-discordjs';
// TODO: internationalize piece options

export class EnceladusClient extends SapphireClient {

	public constructor({ ...options }: ClientOptions) {
		super({
			...options,
			i18n: {
				defaultMissingKey: 'missingKey',
				defaultNS: 'global',
				i18next: {
					preload: ['en-US'],
					load: 'all',
					fallbackLng: 'en-US',
					initImmediate: false
				}
			}
		});
	}

	public fetchLanguage = () => 'en-US';

}
