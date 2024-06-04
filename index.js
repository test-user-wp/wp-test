const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
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
		// executablePath: CHROMIUM_PATH,
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

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Client is ready!');
});

// When the client received QR-Code
client.on('qr', (qr) => {
	qrcode.generate(qr, { small: true });
});

// Start your client
client.initialize();
