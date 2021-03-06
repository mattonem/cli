// Register core config options
const { default: PercyConfig } = require('@percy/config');
const CoreConfig = require('./config');

PercyConfig.addSchema(CoreConfig.schema);
PercyConfig.addMigration(CoreConfig.migration);

// Export the Percy class with commonjs compatibility
module.exports = require('./percy').default;
