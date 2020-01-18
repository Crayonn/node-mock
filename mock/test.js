const mock = require('mockjs')
module.exports = {
    'post /b': {
        b: 'b'
    },
    'put /c': {
        c: 'c'
    },
    'get /mock': function(req, res) {
        res.json(mock.mock({"number|1-10": 2}));
    }
}
