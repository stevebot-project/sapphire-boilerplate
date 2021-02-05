import { ApplyOptions } from '@sapphire/decorators';
import { Command, CommandOptions } from '@sapphire/framework';
import { Message } from 'discord.js';

@ApplyOptions<CommandOptions>({
	description: 'Runs a connection test to Discord.'
})
export default class extends Command {

	public async run(msg: Message) {
		const pingMsg = await msg.channel.sendTranslated('commands:ping.ping') as Message;
		return pingMsg.editTranslated('commands:ping.pong', [
			{
				latency: pingMsg.createdTimestamp - msg.createdTimestamp
			}
		]);
	}

}
