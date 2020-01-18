const express = require('express');
const runFiles = require('./readMockFiles');
const config = require('./config');
const utils = require('./utils');

const host = config.HOST || '0.0.0.0';
const port = config.POST || 3004;

function runServer() {
    let app = express();

    runFiles(config.mockPath, app);

    app.listen(port, host,() => {
        utils.log(`Mock server running on ${host}:${port}`);
    });
}

runServer();
