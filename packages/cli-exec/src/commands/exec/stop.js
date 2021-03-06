import Command, { flags } from '@percy/cli-command';
import { request } from '@percy/client/dist/utils';
import logger from '@percy/logger';
import execFlags from '../../flags';

export class Stop extends Command {
  static description = 'Stops a local running Percy snapshot server';

  static flags = {
    ...flags.logging,
    ...execFlags
  };

  log = logger('cli:exec:stop');

  async run() {
    let { port } = this.flags;

    if (!this.isPercyEnabled()) {
      this.log.info('Percy is disabled');
      return;
    }

    try {
      await request(`http://localhost:${port}/percy/stop`, { method: 'POST' });
    } catch (err) {
      this.log.error('Percy is not running');
      this.log.debug(err);
      this.exit(1);
    }

    // retry heathcheck until it fails
    await new Promise(function check(resolve) {
      return request(`http://localhost:${port}/percy/healthcheck`, { method: 'GET' })
        .then(() => setTimeout(check, 100, resolve)).catch(resolve);
    });

    this.log.info('Percy has stopped');
  }
}
