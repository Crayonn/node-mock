const fs = require('fs');
const config = require('./config');
const utils = require('./utils');

function getALlPath(path, filename) {
    return `${path}/${filename}`;
}

function register(objectKey = '', mockOject, app) {
    const [method, url] = (objectKey || '').split(' ');
    app[(method || 'GET').toLowerCase()](url, function (req, res) {
        if (utils.isFunction(mockOject[objectKey])) {
            mockOject[objectKey](req, res);
        }
        else {
            res.json(mockOject[objectKey]);
        }
    });
}

module.exports = function readMockFiles(path, app) {
    const isFileExist = fs.existsSync(path);
    if (isFileExist) {
        const filenames = fs.readdirSync(path);
        const fileType = config.extensions;

        filenames.forEach(function (filename) {
            const allPath = getALlPath(path, filename);
            const stat = fs.statSync(allPath);
            if (stat.isDirectory()) {
                readMockFiles(allPath, app);
            }
            else if (stat.isFile() && fileType.test(allPath)) {
                let mockOject = require(allPath);

                Object.keys(mockOject).forEach(key => register(key, mockOject, app));
            }
        });
    }
}
