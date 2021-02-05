import { err, ok, Precondition, UserError } from '@sapphire/framework';
import { Message } from 'discord.js';
import { OWNERS } from '@root/config';

export default class extends Precondition {

	public run(msg: Message) {
		// TODO: y u no message
		return OWNERS.includes(msg.author.id) ? ok() : err(new UserError('owner', 'Only bot owners can use this command!'));
	}

}
