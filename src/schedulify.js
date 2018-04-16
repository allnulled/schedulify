module.exports = {
	schedule: function(data) {
		const commander = require("commander")
			.version("1.0.0")
			.option("-m, --minutes [value]", "Minutes.")
			.option("-h, --hours [value]", "Hours.")
			.option("-d, --days [value]", "Day of the month.")
			.option("-M, --months [value]", "Months.")
			.option("-w, --days-of-week [value]", "Day of the week.")
			.option("-c, --command [value]", "Command to run.")
			.option("-t, --title [value]", "Title to show in a desktop notification.")
			.option("-i, --info [value]", "Message to show in a desktop notification.")
			.parse(process.argv);
		const today = new Date();
		const minutes = commander.minutes ? commander.minutes : 0;
		const hours = commander.hours ? commander.hours : "*";
		const days = commander.days ? commander.days : today.getDate();
		const months = commander.months ? commander.months : (today.getMonth() + 1);
		const years = commander.years ? commander.years : "*";
		const cronCommand = "$minutes $hours $days $months $years"
			.replace("$minutes", minutes)
			.replace("$hours", hours)
			.replace("$days", days)
			.replace("$months", months)
			.replace("$years", years);
		const schedule = require("node-schedule").scheduleJob(cronCommand, function(date) {
			console.log("[schedulify] Job in action at: " + date);
			require("./notify").notify({
				title: commander.title || "Schedule",
				message: commander.info
			});
		});
	}
};