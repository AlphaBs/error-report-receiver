require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// PostgreSQL connection pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Use morgan to log HTTP requests
app.use(morgan('combined'));

app.use(bodyParser.json());

app.post('/report', async (req, res) => {
  const {
    traceId,
    appName,
    appVersion,
    clientId,
    osname,
    time: timestamp,
    error: { id: errorId = null, log: errorLog = null, errorContext = null } = {}
  } = req.body;

  try {
    const query = `
      INSERT INTO error_logs (
        trace_id, app_name, app_version, client_id, osname, timestamp, error_id, error_log, error_context
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `;
    const values = [traceId, appName, appVersion, clientId, osname, timestamp, errorId, errorLog, errorContext];
    await pool.query(query, values);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});