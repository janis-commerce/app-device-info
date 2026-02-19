export * from 'react-native-device-info';
export {
	useNetInfo,
	fetch,
	configure,
	addEventListener,
	refresh,
} from '@react-native-community/netinfo';

// ─── deviceInfo ───────────────────────────────────────────────────────────────

/**
 * Returns a string representing the device brand and model.
 * @example getDeviceModel() // "samsung A-03"
 */
export declare function getDeviceModel(): string;

/**
 * Returns the device operating system name and version.
 * @example getOSVersion() // "android 12"
 */
export declare function getOSVersion(): string;

export interface DeviceScreenMeasurements {
	screenHeight: number;
	screenWidth: number;
}

/**
 * Returns the device screen dimensions in physical pixels.
 * @example getDeviceScreenMeasurements() // { screenWidth: 1080, screenHeight: 2280 }
 */
export declare function getDeviceScreenMeasurements(): DeviceScreenMeasurements;

export interface DeviceInfoHeaders {
	applicationName: string;
	buildNumber: string;
	appVersion: string;
	bundleId: string;
	osName: string;
	osVersion: string;
	deviceId: string;
	deviceName: string;
}

/**
 * Returns an object with device data intended for Janis device headers.
 */
export declare function getDeviceInfoForHeaders(): DeviceInfoHeaders;

// ─── netInfo ──────────────────────────────────────────────────────────────────

export interface NetworkStateSuccess {
	networkType: string;
	networkCarrier: string;
	/** Cellular generation (e.g. "4g") or signal strength value when on Wi-Fi. */
	networkStrength: string | number;
	isInternetReachable: boolean | null;
	details: Record<string, unknown>;
}

export interface NetworkStateUnavailable {
	networkType: 'not available';
	networkCarrier: 'not available';
	networkStrength: 0;
	isInternetReachable: false;
	/** Error message describing why the connection is unavailable. */
	reason: string;
	details: Record<string, unknown>;
}

/**
 * Returns the current network state.
 * Resolves to `NetworkStateUnavailable` when the device has no connection or
 * an error occurs; never rejects.
 */
export declare function getNetworkState(): Promise<NetworkStateSuccess | NetworkStateUnavailable>;

/**
 * Returns whether the internet is currently reachable.
 * Returns `null` when the reachability check has not completed yet.
 */
export declare function getInternetReachability(): Promise<boolean | null>;
