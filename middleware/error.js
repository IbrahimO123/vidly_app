const winston = require("winston");

module.exports = function (err, req, res, next) {
  //logging out the execption
  const logger = winston.createLogger({
    transports: [
      new winston.transports.Console({ colorize: true, prettyPrint: true }),
      new winston.transports.File({ filename: "log/combined.log" }),
      new winston.transports.File({
        filename: "log/error.log",
        level: "error",
      }),
      new winston.transports.File({ filename: "log/info.log", level: "info" }),
      // new winston.transports.MongoDB({db: "mongodb://localhost/logger"})
    ],
  });
//INSTRUCTIONS
  //logging to mongodb database
  // winston.add();
  //install winston-monogdb first "npm i winston-mongodb"
  //var winston = require('winston');

  /**
   * Requiring `winston-mongodb` will expose
   * `winston.transports.MongoDB`
  //  */
  // require('winston-mongodb');

  // winston.add(new winston.transports.MongoDB(options));

  logger.error(err.message, err);

  return res.status(500).send("Something Failed..");
};
