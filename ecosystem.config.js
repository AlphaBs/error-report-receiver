require('dotenv').config();

module.exports = {
    apps: [
      {
        name: 'error-report-receiver',
        script: 'index.js',
        instances: '2', // Or a specific number of instances
        exec_mode: 'cluster', // Enables clustering
        restart_delay: 1000,
        env: {
            NODE_ENV: 'development',
            DB_USER: process.env.DB_USER,
            DB_HOST: process.env.DB_HOST,
            DB_NAME: process.env.DB_NAME,
            DB_PASSWORD: process.env.DB_PASSWORD,
            DB_PORT: process.env.DB_PORT,
        },
        env_production: {
          NODE_ENV: 'production',
          DB_USER: process.env.DB_USER,
          DB_HOST: process.env.DB_HOST,
          DB_NAME: process.env.DB_NAME,
          DB_PASSWORD: process.env.DB_PASSWORD,
          DB_PORT: process.env.DB_PORT,
        },
        log: './logs/combined.log'
      }
    ]
  };