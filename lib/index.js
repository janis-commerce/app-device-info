/*istanbul ignore file*/
import NetInfo, {
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
} from './deviceInfo.js';
import {getNetworkState, getInternetReachability} from './netInfo.js';

const reachabilityUrl = 'https://janis.in';

NetInfo.configure({reachabilityUrl});

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
};
