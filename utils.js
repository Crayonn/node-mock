const chalk = require('chalk');
module.exports = {
    log: message => console.log(chalk.green(message)),
    isFunction: func => Object.prototype.toString.call(func) === '[object Function]' 
}
