/*istanbul ignore file*/
import {
	useNetInfo,
	fetch,
	configure,
	addEventListener,
	refresh,
} from '@react-native-community/netinfo';
import {
	getDeviceModel,
	getOSVersion,
	getDeviceScreenMeasurements,
	getDeviceInfoForHeaders,
	getAppInfo,
	getJanisHeaders,
	getReachabilityUrl,
} from './deviceInfo.js';
import {getNetworkState, getInternetReachability} from './netInfo.js';

export * from 'react-native-device-info';
export {
	useNetInfo,
	fetch,
	configure,
	addEventListener,
	refresh,
	getDeviceModel,
	getOSVersion,
	getDeviceScreenMeasurements,
	getNetworkState,
	getDeviceInfoForHeaders,
	getInternetReachability,
	getAppInfo,
	getJanisHeaders,
	getReachabilityUrl,
};
