import { ApplyOptions } from '@sapphire/decorators';
import { Event, EventOptions, Events } from '@sapphire/framework';

@ApplyOptions<EventOptions>({ once: true })
export default class extends Event<Events.Ready> {

	public run() {
		return this.context.client.logger.info('ready!');
	}

}
