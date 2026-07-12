const app = require('./src/app');
const sequelize = require('./src/config/db');
const config = require('./src/config/env');
require('./src/models'); // ensures all models + associations are registered

async function start() {
  try {
    await sequelize.authenticate();
    console.log('Database connection established.');

    // In dev, sync schema automatically. In production, use migrations instead.
    if (config.nodeEnv === 'development') {
      await sequelize.sync({ alter: true });
      console.log('Models synced.');
    }

    app.listen(config.port, () => {
      console.log(`EcoSphere API running on port ${config.port}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

start();
