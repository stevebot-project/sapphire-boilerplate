import { ApplyOptions } from '@sapphire/decorators';
import { Args, Command, CommandOptions } from '@sapphire/framework';
import { Type } from '@sapphire/type';
import { codeBlock, isThenable } from '@sapphire/utilities';
import { Message } from 'discord.js';
import { inspect } from 'util';

@ApplyOptions<CommandOptions>({
	aliases: ['ev'],
	description: 'Evaluate JavaScript code.',
	preconditions: ['owner']
})
export default class extends Command {

	public async run(msg: Message, args: Args) {
		const code = await args.pick('string');

		const { result, success, type } = await this.eval(msg, code);

		const overflow = codeBlock('js', result).length > 2000;

		return msg.channel.sendTranslated(success ? 'commands:eval.success' : 'commands:eval.error', [
			{
				output: overflow ? '' : codeBlock('js', result),
				type
			}
		], {
			files: overflow
				? [{
					name: 'evalResult.js',
					attachment: Buffer.from(result || '')
				}]
				: []
		});
	}

	private async eval(msg: Message, code: string): Promise<{ result: string | undefined; success: boolean; type: Type }> {
		let result: unknown | undefined = undefined;
		let success: boolean | undefined = undefined;
		let type: Type | undefined = undefined;

		try {
			// eslint-disable-next-line no-eval
			result = eval(code);
			if (isThenable(result)) result = await result;

			type = new Type(result);
			success = true;
		} catch (err) {
			result = err;
			type = new Type(err);
			success = false;
		}

		const resultString = typeof result === 'string'
			? result
			: result instanceof Error ? result.stack : inspect(result, { depth: 3 });

		return { result: resultString, success, type };
	}

}
