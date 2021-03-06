// required before fs is mocked by the config helper
import '@oclif/command';
import logger from '@percy/logger/test/helper';

beforeEach(() => {
  logger.mock();
});

export { logger };
export { default as mockConfig, getMockConfig } from '@percy/config/test/helper';
