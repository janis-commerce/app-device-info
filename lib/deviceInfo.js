import {
	getApplicationName,
	getBrand,
	getBuildNumber,
	getBundleId,
	getModel,
	getSystemName,
	getSystemVersion,
	getUniqueId,
	getVersion,
} from 'react-native-device-info';
import {Dimensions, PixelRatio} from 'react-native';

// Last segment must be exactly beta|qa (not endsWith) so e.g. betabeta is not janisdev.
const JANIS_BUNDLE_PREFIX = 'in.janis.';

const getEnvironment = () => {
	const normalizedBundleId = String(getBundleId() ?? '')
		.trim()
		.toLowerCase();
	if (!normalizedBundleId.startsWith(JANIS_BUNDLE_PREFIX)) return null;

	const bundleSegments = normalizedBundleId.split('.');
	const everySegmentHasText = bundleSegments.every((bundleSegment) => bundleSegment.length > 0);
	if (!everySegmentHasText) return null;

	const hasJanisShape =
		bundleSegments.length >= 3 && bundleSegments[0] === 'in' && bundleSegments[1] === 'janis';
	if (!hasJanisShape) return null;

	const lastBundleSegment = bundleSegments[bundleSegments.length - 1];
	if (lastBundleSegment === 'beta') return 'janisdev';
	if (lastBundleSegment === 'qa') return 'janisqa';
	return 'janis';
};

/***
 * @name getDeviceModel
 * @description returns a string that represent device brand and model
 * @returns {string}
 * @example getDeviceModel() => 'samsung A-03'
 */

export const getDeviceModel = () => `${getBrand()} ${getModel()}`;

/***
 * @name getOSVersion
 * @description returns the device operative system and its version
 * @returns {string}
 * @example getOSVersion() => android 12
 */

export const getOSVersion = () => `${getSystemName()} ${getSystemVersion()}`;

/***
 * @name getDeviceScreenMeasurements
 * @description returns the device screen measurements
 * @returns {object}
 * @example getDeviceScreenMeasurements() => {screenWidth: 1080, screenHeight: 2280}
 */

export const getDeviceScreenMeasurements = () => {
	const pixelRatio = PixelRatio.get();
	const {height, width} = Dimensions.get('screen');

	return {
		screenHeight: height * pixelRatio,
		screenWidth: width * pixelRatio,
	};
};

/***
 * @name getDeviceInfoForHeaders
 * @description returns an object with the device data for janis device headers
 * @returns {object}
 * @example getDeviceInfoForHeaders() => {
 *  applicationName:'janis app',
 *  buildNumber:'0',
 *  appVersion:'1.22.0',
 *  bundleId:'10',
 *  osName:'android',
 *  osVersion: '13',
 *  deviceId:'12345',
 *  deviceName:'samsung',
 * }
 */

export const getDeviceInfoForHeaders = () => ({
	applicationName: getApplicationName() || '',
	buildNumber: getBuildNumber() || '',
	appVersion: getVersion() || '',
	bundleId: getBundleId() || '',
	osName: getSystemName() || '',
	osVersion: getSystemVersion() || '',
	deviceId: getUniqueId() || '',
	deviceName: getModel() || '',
});

/***
 * @name getAppInfo
 * @returns {{
 *   appName: string;
 *   janisEnv: string;
 * }}
 * @property {string} appName `AppInfo.appName` — display name from the OS (`getApplicationName`). Empty string if unavailable.
 * @property {string} janisEnv `AppInfo.janisEnv` — `JANIS_ENV` in `@janiscommerce/app-request` (host / URL segment): `janis`, `janisdev`, or `janisqa`; empty string if the bundle is not a valid Janis app (`in.janis.*` rules).
 * @example getAppInfo() => {
 *  appName: 'Janis Orders App',
 *  janisEnv: 'janisqa',
 * }
 */
export const getAppInfo = () => {
	const appName = getApplicationName() || '';

	return {
		appName,
		janisEnv: getEnvironment() ?? '',
	};
};
