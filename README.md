# schedulify

![](https://img.shields.io/badge/schedulify-v1.0.0-green.svg)

Cross-platform task scheduler for Node.js through CLI or API.

## 1. Installation

~$ `npm install -g schedulify`

## 2. Usage

### 2.1. Usage of the API

##### Import the API and call `.schedulify(~)`:

There are 2 properties accepted as parameters: 

- `cron`: {String} a valid cron date expression.

- `data`: {String|Function|Object} information for the schedule. Depending on what it is:

a) `{String}`: executes the string as a command-line order.

b) `{Function}`: executes the JavaScript function as a callback.

c) `{Object}`: executes the notification. Expects a `title`, a `message` and an `icon` (all of them `{String}`, and optional).


```js
require("schedulify").schedulify({
	cron: "* * * * * *",
	data: function() {
		console.log("[sec. " + new Date().getSeconds() + "] If you see this message every second, the test is passed.");
	}
});
```

Note that you can pass into `data` parameter, any:

- `{String}`: will be executed as a command for the command-line of the current operative system.

- `{Function}`: will be executed as a normal JavaScript callback.

- `{Object}`: will be understood as a notifiable task. The object can have:

a) `message`: {String} message to show in the notification.

b) `title`: {String} title to show in the notification.

c) `icon`: {String} path to the icon to show in the notification.

### 2.1. Usage of the CLI

Here you can see all the options available:

```
schedulify {Parameters}

{Parameters}:

option -s, --seconds [value]: Seconds.
option -m, --minutes [value]: Minutes.
option -h, --hours [value]: Hours.
option -d, --days [value]: Day of the month.
option -M, --months [value]: Months.
option -w, --days-of-week [value]: Day of the week.
option -c, --command [value]: Command to run.
option -t, --title [value]: Title to show in a desktop notification.
option -i, --info [value]: Message to show in a desktop notification.
```

Example:

```
schedulify -s "*/5" -i "This is some message"
```

This command will make `schedulify` show a desktop notification each 5 seconds.



## 3. Conclusion

A very simple tool that can be very useful. Thanks to the developers envolved in the middleware of this simple package.