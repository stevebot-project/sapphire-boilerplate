import { ApplyOptions } from '@sapphire/decorators';
import { Command, CommandOptions } from '@sapphire/framework';
import { Message } from 'discord.js';

@ApplyOptions<CommandOptions>({
	description: 'Runs a connection test to Discord.'
})
export default class extends Command {

	public async run(msg: Message) {
		const pingMsg = await msg.channel.send('Ping?');
		return pingMsg.edit(`Pong! Your ping is ${pingMsg.createdTimestamp - msg.createdTimestamp}ms. I'm working with Sapphire!`);
	}

}
