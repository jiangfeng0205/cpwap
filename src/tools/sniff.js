/**
 * 环境嗅探
 *
 * @property sniff
 * @type {Object}
 * @category Sniff
 * @value {os: 'ios', ios: true, android: false, iphone: true, ipad: false, ipod: false, imobile: true, osVersion: '8.1.2', osVersionN: 8, pixelRatio: 2, retina: true, pc: false}
 */

var sniff = {}; // 结果

var win = window;

var ua = navigator.userAgent,
	platform = navigator.platform,
	android = ua.match(/(Android);?[\s\/]+([\d.]+)?/), // 匹配 android
	ipad = ua.match(/(iPad).*OS\s([\d_]+)/), // 匹配 ipad
	ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/), // 匹配 ipod
	iphone = ua.match(/(iPhone\sOS)\s([\d_]+)/); // 匹配 iphone

sniff.ios = sniff.android = sniff.iphone = sniff.ipad = sniff.ipod = false;

/**
 * Android 设备嗅探
 *
 * @property QApp.sniff.android
 * @type {Boolean}
 * @category Sniff
 */
if (android) {
	sniff.os = 'android';
	sniff.osVersion = android[2];
	sniff.android = true;
}

/**
 * iOS 设备嗅探
 *
 * @property QApp.sniff.ios
 * @type {Boolean}
 * @category Sniff
 */
if (ipad || iphone || ipod) {
	sniff.os = 'ios';
	sniff.ios = true;
}

/**
 * iPhone 设备嗅探
 *
 * @property QApp.sniff.iphone
 * @type {Boolean}
 * @category Sniff
 */
if (iphone) {
	sniff.osVersion = iphone[2].replace(/_/g, '.');
	sniff.iphone = true;
	sniff.imobile = true;
}

/**
 * iPad 设备嗅探
 *
 * @property QApp.sniff.ipad
 * @type {Boolean}
 * @category Sniff
 */
if (ipad) {
	sniff.osVersion = ipad[2].replace(/_/g, '.');
	sniff.ipad = true;
}

/**
 * iPod 设备嗅探
 *
 * @property QApp.sniff.ipod
 * @type {Boolean}
 * @category Sniff
 */
if (ipod) {
	sniff.osVersion = ipod[3] ? ipod[3].replace(/_/g, '.') : NULL;
	sniff.ipod = true;
	sniff.imobile = true;
}

/**
 * imobile 设备嗅探
 *
 * @property QApp.sniff.imobile
 * @type {Boolean}
 * @category Sniff
 */

/**
 * ios 设备嗅探
 *
 * @property QApp.sniff.ios
 * @type {Boolean}
 * @category Sniff
 */

// iOS 8+ changed UA
if (sniff.ios && sniff.osVersion && ua.indexOf('Version/') >= 0) {
	if (sniff.osVersion.split('.')[0] === '10') {
		sniff.osVersion = ua.toLowerCase().split('version/')[1].split(' ')[0];
	}
}

/**
 * osVersion 设备版本
 *
 * @property QApp.sniff.osVersion
 * @type {String}
 * @category Sniff
 * @value '8.1.2'
 */

/**
 * osVersionN 设备版本
 *
 * @property QApp.sniff.osVersionN
 * @type {Number}
 * @category Sniff
 * @value 8
 */

if (sniff.osVersion) {
	sniff.osVersionN = parseInt(sniff.osVersion.match(/\d+\.?\d*/)[0]);
}

/**
 * 像素比率
 *
 * @property QApp.sniff.pixelRatio
 * @type {Number}
 * @category Sniff
 * @value 2
 */
sniff.pixelRatio = win.devicePixelRatio || 1;

/**
 * 高清屏判断
 *
 * @property QApp.sniff.retina
 * @type {Boolean}
 * @category Sniff
 */
sniff.retina = sniff.pixelRatio >= 2;

/**
 * 判断是否在pc上模拟
 *
 * @property QApp.sniff.pc
 * @type {Boolean}
 * @category Sniff
 */
sniff.pc = platform.indexOf('Mac') === 0 || platform.indexOf('Win') === 0 || (platform.indexOf('linux') === 0 && !sniff.android);

module.exports = sniff;