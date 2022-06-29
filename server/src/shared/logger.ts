import {createLogger, transports, format} from 'winston'
	
const customFormat = format.combine(
	format.timestamp(),
	format.printf((info) => {
	  return `${info.timestamp}  [${info.level.padEnd(5).toUpperCase()}] : ${info.message}`;
	})
  );

const destinations = [new transports.Console()]

const logger = createLogger({
	transports : destinations,
	level:'debug',
	format : customFormat,
	silent : process.env.NODE_ENV === 'test'
})

export default logger