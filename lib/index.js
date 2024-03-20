/*istanbul ignore file*/
import NetInfo, {useNetInfo} from '@react-native-community/netinfo';
import {
	getDeviceModel,
	getOSVersion,
	getDeviceScreenMeasurements,
	getDeviceInfoForHeaders,
} from './deviceInfo.js';
import {getNetworkState, getInternetReachability} from './netInfo.js';

const reachabilityUrl = 'https://janis.in';

NetInfo.configure({
	reachabilityUrl,
});

export * from 'react-native-device-info';
export {
	useNetInfo,
	getDeviceModel,
	getOSVersion,
	getDeviceScreenMeasurements,
	getNetworkState,
	getDeviceInfoForHeaders,
	getInternetReachability,
};
