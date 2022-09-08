const winston = require('winston');

module.exports = function() {
    // listen for uncaught exceptions
winston.exceptions.handle(new winston.transports.File({filename: "log/uncaughtException.log"}))

// listen for unhandled rejections
process.on("unhandledRejection", (ex) => {
  winston.error(ex.message, ex) 
  process.exit(1); 
})

// file to log the unhandle rejections 
winston.add(new winston.transports.File({filename: "log/unhandledRejection.log", level: "error"}))
winston.add(new winston.transports.Console({level: "info",colorize: true, prettyPrint: true }),)

}