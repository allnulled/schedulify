const dateformat = require("dateformat");
const desknotifier = require("desknotifier");
const exec = require("execute-command-sync");

function formatFromDate(text, date = new Date()) {
	const DATE_FORMAT = "yyyy/mm/dd hh:MM:ss";
	return text
		.replace("${date}", function(match) {return dateformat(date, DATE_FORMAT);})
		.replace("${second}", dateformat(date, "ss"))
		.replace("${minute}", dateformat(date, "MM"))
		.replace("${hour}", dateformat(date, "hh"))
		.replace("${day}", dateformat(date, "dd"))
		.replace("${month}", dateformat(date, "mm"))
		.replace("${year}", dateformat(date, "yyyy"))
		.replace("${dayofweek}", dateformat(date, "dddd"));
};

function _scheduleTask(parameters) {
	const nodeSchedule = require("node-schedule");
	switch(parameters.type) {
		case "notification":
			return nodeSchedule.scheduleJob(parameters.cron, function(date) {
				desknotifier.notify({
					title: formatFromDate(parameters.data.title || "Schedule", date),
					message: formatFromDate(parameters.data.info || "", date)
				});
			});
		case "command":
			return nodeSchedule.scheduleJob(parameters.cron, function(date) {
				exec(parameters.data);
			});
		case "function":
			return nodeSchedule.scheduleJob(parameters.cron, parameters.data);
		default:
			throw {
				name: "ParameterNotValid", 
				message: "Available types only: 'notification', 'command' or 'function'"
			};
	}
};

function scheduleTask(parameters) {
	if(typeof parameters.data === "function") {
		parameters.type = "function";
		return _scheduleTask(parameters);
	} else if(typeof parameters.data === "string") {
		parameters.type = "command";
		return _scheduleTask(parameters);
	} else if(typeof parameters.data === "object") {
		if(!("type" in parameters)) {
			parameters.type = "notification";
		}
		return _scheduleTask(parameters);
	}
	throw {name: "ParameterNotValid"};
};

module.exports = {
	/**
	 * @name schedulify
	 * @type {Function}
	 * @param parameters {Object} 
	 * 		- type: {String} Optional. It can be: "function", "command" or "notification".
	 * 		- cron: {String} Optional. It can be what is accepted by [node-schedule](https://github.com/node-schedule/node-schedule) module
	 * 		- data: {String|Function|Object} Optional. 
	 * 				- when {String} then - type:"command" will be understood.
	 * 				- when {Function} then - type:"function" will be understood.
	 * 				- when {Object} then - type:"notification" will be understood.
	 *
	 *
	 */
	schedulify: scheduleTask
};
