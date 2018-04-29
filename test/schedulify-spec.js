require(__dirname + "/../src/schedulify.js").schedulify({
	cron: "* * * * * *",
	data: function() {
		console.log("[sec. " + new Date().getSeconds() + "] If you see this message every second, the test is passed.");
	}
});