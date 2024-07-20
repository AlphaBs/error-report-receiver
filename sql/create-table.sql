CREATE TABLE error_logs (
    trace_id UUID PRIMARY KEY,
    app_name VARCHAR(255) NOT NULL,
    app_version VARCHAR(50) NOT NULL,
    client_id VARCHAR(255) NOT NULL,
    osname VARCHAR(50) NOT NULL,
    timestamp TIMESTAMPTZ NOT NULL,
    error_id VARCHAR(255) NOT NULL,
    error_log TEXT,
    error_context VARCHAR(255)
);

CREATE INDEX idx_app_logs_timestamp ON error_logs(timestamp);
CREATE INDEX idx_app_logs_app_name_version ON error_logs(app_name, app_version);