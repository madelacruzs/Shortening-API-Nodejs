const os = require("os");

module.exports = {
	PORT: 10001,
	Host: os.hostname(),
	MSSQL: {
		user: "XXX",
		password: "XXX",
		server: ".XXX",
		database: "XXX",
		options: {
			encrypt: true, // Use this if you're on Windows Azure
		},
	},
};
