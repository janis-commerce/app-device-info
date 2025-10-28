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
 * @description returns an object with the app name and environment
 * @returns {object}
 * @example getAppInfo() => {
 *  appName: 'Janis Orders App',
 *  environment: 'qa',
 * }
 */
export const getAppInfo = () => {
	const appName = getApplicationName() || '';
	const bundleId = getBundleId() || '';
	const environment = !!bundleId ? bundleId.split('.')[3] || 'prod' : '';

	return {
		appName,
		environment,
	};
};
