// Dependencies:
const dateformat = require("dateformat");
const desknotifier = require("desknotifier");
const schedulify = require(__dirname + "/../src/schedulify.js");

// Globals:
const parameters = Object.assign({}, {
	seconds: 0,
	minutes: 0,
	hours: "*",
	days: "*",
	months: "*",
	dayOfWeek: "*"
}, require("commander")
	.option("-s, --seconds [value]", "Seconds.")
	.option("-m, --minutes [value]", "Minutes.")
	.option("-h, --hours [value]", "Hours.")
	.option("-d, --days [value]", "Day of the month.")
	.option("-M, --months [value]", "Months.")
	.option("-w, --days-of-week [value]", "Day of the week.")
	.option("-c, --command [value]", "Command to run.")
	.option("-t, --title [value]", "Title to show in a desktop notification.")
	.option("-i, --info [value]", "Message to show in a desktop notification.")
	.parse(process.argv)
);

// Cron command:
const cronCommand = "$seconds $minutes $hours $days $months $dayOfWeek"
	.replace("$seconds", parameters.seconds)
	.replace("$minutes", parameters.minutes)
	.replace("$hours", parameters.hours)
	.replace("$days", parameters.days)
	.replace("$months", parameters.months)
	.replace("$dayOfWeek", parameters.dayOfWeek);

// Cron command help text:
const cronCommandHelp = "\nSeconds: $seconds\nMinutes: $minutes\nHours:   $hours\nDays:    $days\nMonths:  $months\nDays of the week: $dayOfWeek"
	.replace("$seconds", parameters.seconds)
	.replace("$minutes", parameters.minutes)
	.replace("$hours", parameters.hours)
	.replace("$days", parameters.days)
	.replace("$months", parameters.months)
	.replace("$dayOfWeek", parameters.dayOfWeek);

// Now:
var now = new Date();

// Scheduling:
console.log("[schedulify] New cron task created");
console.log("[schedulify]   Time: " + cronCommandHelp.split("\n").join("\n[schedulify]   · "));
console.log("[schedulify]   Cron expression: " + cronCommand);
console.log("[schedulify]   Current time: " + now);


if("title" in parameters || "info" in parameters) {
	schedulify.schedulify({
		type: "notification",
		cron: cronCommand,
		data: parameters
	});
}

if("command" in parameters) {
	schedulify.schedulify({
		type: "command",
		cron: cronCommand,
		data: parameters.command
	});
}


