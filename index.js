const { Client, LocalAuth } = require('whatsapp-web.js');
const PUPPETEER_ARGS = [
	'--no-sandbox',
	'--disable-setuid-sandbox',
	'--unhandled-rejections=strict',
	'--disable-dev-shm-usage',
	'--disable-accelerated-2d-canvas',
	'--no-first-run',
	'--no-zygote',
	'--single-process', // <- this one doesn't works in Windows
	'--disable-gpu',
];
const client = new Client({
	restartOnAuthFail: true,

	puppeteer: {
		headless: true,
		args: PUPPETEER_ARGS,
		executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
	},

	authStrategy: new LocalAuth({
		clientId: this.client_id,
	}),
	webVersionCache: {
		type: 'remote',
		remotePath:
			'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html',
	},
});

client.on('qr', async (qrCode) => {
	console.log(`${this.userService.getUser().username} - ${this.client_id}`);
});

client.on('authenticated', async () => {
	console.log(`${this.userService.getUser().username} - ${this.client_id}`);
});

client.on('ready', async () => {
	console.log(`${this.userService.getUser().username} - ${this.client_id}`);
});

client.initialize();
