import {
	getAppInfo,
	getDeviceInfoForHeaders,
	getJanisHeaders,
	getDeviceModel,
	getDeviceScreenMeasurements,
	getOSVersion,
	getReachabilityUrl,
} from '../lib/deviceInfo.js';
import DeviceInfoPkg from 'react-native-device-info';
import {PixelRatio, Dimensions} from 'react-native';

const getBrandSpy = jest.spyOn(DeviceInfoPkg, 'getBrand');
const getModelSpy = jest.spyOn(DeviceInfoPkg, 'getModel');
const getApplicationNameSpy = jest.spyOn(DeviceInfoPkg, 'getApplicationName');
const getBuildNumberSpy = jest.spyOn(DeviceInfoPkg, 'getBuildNumber');
const getVersionSpy = jest.spyOn(DeviceInfoPkg, 'getVersion');
const getBundleIdSpy = jest.spyOn(DeviceInfoPkg, 'getBundleId');
const getSystemNameSpy = jest.spyOn(DeviceInfoPkg, 'getSystemName');
const getSystemVersionSpy = jest.spyOn(DeviceInfoPkg, 'getSystemVersion');
const getUniqueIdSpy = jest.spyOn(DeviceInfoPkg, 'getUniqueId');
const pixelRatioRNspy = jest.spyOn(PixelRatio, 'get');
const dimensionsRNspy = jest.spyOn(Dimensions, 'get');

describe('DeviceInfo utils:', () => {
	describe('getDeviceModel', () => {
		it('returns a string representing device brand and model', () => {
			getBrandSpy.mockReturnValueOnce('samsung');
			getModelSpy.mockReturnValueOnce('A-105-0');

			const deviceModel = getDeviceModel();

			expect(deviceModel).toStrictEqual('samsung A-105-0');
		});
	});

	describe('getOSVersion', () => {
		it('returns a string representing device operative system and its version', () => {
			getSystemNameSpy.mockReturnValueOnce('android');
			getSystemVersionSpy.mockReturnValueOnce('13');

			const deviceOS = getOSVersion();

			expect(deviceOS).toStrictEqual('android 13');
		});
	});

	describe('getDeviceScreenMeasurements', () => {
		it('returns an object containing devices width and height measurements', () => {
			pixelRatioRNspy.mockReturnValueOnce(1);
			dimensionsRNspy.mockReturnValueOnce({width: 480, height: 1200});

			const deviceMeasurements = getDeviceScreenMeasurements();
			expect(deviceMeasurements).toStrictEqual({
				screenHeight: 1200,
				screenWidth: 480,
			});
		});
	});

	describe('getDeviceInfoForHeaders', () => {
		it('returns an object with data for headers', () => {
			getApplicationNameSpy.mockReturnValueOnce('janis app');
			getBuildNumberSpy.mockReturnValueOnce('0');
			getVersionSpy.mockReturnValueOnce('1.22.0');
			getBundleIdSpy.mockReturnValueOnce('10');
			getSystemNameSpy.mockReturnValueOnce('android');
			getSystemVersionSpy.mockReturnValueOnce('13');
			getUniqueIdSpy.mockReturnValueOnce('12345');
			getModelSpy.mockReturnValueOnce('samsung');

			const headers = getDeviceInfoForHeaders();

			expect(headers).toStrictEqual({
				applicationName: 'janis app',
				buildNumber: '0',
				appVersion: '1.22.0',
				bundleId: '10',
				osName: 'android',
				osVersion: '13',
				deviceId: '12345',
				deviceName: 'samsung',
			});
		});

		it('returns an object with empty data for headers when these could not be obtained', () => {
			getApplicationNameSpy.mockReturnValueOnce(null);
			getBuildNumberSpy.mockReturnValueOnce(null);
			getVersionSpy.mockReturnValueOnce(null);
			getBundleIdSpy.mockReturnValueOnce(null);
			getSystemNameSpy.mockReturnValueOnce(null);
			getSystemVersionSpy.mockReturnValueOnce(null);
			getUniqueIdSpy.mockReturnValueOnce(null);
			getModelSpy.mockReturnValueOnce(null);

			const headers = getDeviceInfoForHeaders();

			expect(headers).toStrictEqual({
				applicationName: '',
				buildNumber: '',
				appVersion: '',
				bundleId: '',
				osName: '',
				osVersion: '',
				deviceId: '',
				deviceName: '',
			});
		});
	});

	describe('getAppInfo', () => {
		it.each([
			['in.janis.picking.beta', 'janisdev'],
			['in.janis.picking.qa', 'janisqa'],
			['in.janis.picking', 'janis'],
			['IN.JANIS.PICKING.BETA', 'janisdev'],
			['in.janis.picking.extra.beta', 'janisdev'],
			['in.janis.picking.staging', 'janis'],
			['in.janis.picking.betabeta', 'janis'],
			['  in.janis.picking.beta  ', 'janisdev'],
			[' \tin.janis.picking.qa\n ', 'janisqa'],
			['  in.janis.picking  ', 'janis'],
		])('returns app name and janisEnv from bundle id', (bundleId, janisEnv) => {
			getApplicationNameSpy.mockReturnValueOnce('Janis Orders App');
			getBundleIdSpy.mockReturnValueOnce(bundleId);

			const appInfo = getAppInfo();

			expect(appInfo).toStrictEqual({
				appName: 'Janis Orders App',
				janisEnv,
			});
		});

		it('returns an object with empty data for app info when these could not be obtained', () => {
			getApplicationNameSpy.mockReturnValueOnce(null);
			getBundleIdSpy.mockReturnValueOnce(null);

			const appInfo = getAppInfo();

			expect(appInfo).toStrictEqual({
				appName: '',
				janisEnv: '',
			});
		});

		it.each([
			['third-party bundle', 'com.example.otherapp', 'Other App'],
			['empty bundle id', '', 'App'],
			['whitespace-only bundle id (trimmed to empty)', '   \t  ', 'App'],
			['bundle does not start with in.janis.', 'im.janis.picking.beta', 'App'],
			['trimmed bundle still not Janis (im.janis)', '  im.janis.picking.beta  ', 'App'],
			['empty dot segment (in.janis.)', 'in.janis.', 'App'],
			['double dots in bundle', 'in.janis..picking', 'App'],
			['getBundleId returns non-string', 123, 'App'],
			['getBundleId returns null', null, 'App'],
		])('returns empty janisEnv — %s', (_caseLabel, bundleId, appName) => {
			getApplicationNameSpy.mockReturnValueOnce(appName);
			getBundleIdSpy.mockReturnValueOnce(bundleId);

			expect(getAppInfo()).toStrictEqual({
				appName,
				janisEnv: '',
			});
		});
	});

	describe('getJanisHeaders', () => {
		it('returns the device data mapped to the janis-app-* headers', () => {
			getApplicationNameSpy.mockReturnValueOnce('Janis Orders App');
			getBuildNumberSpy.mockReturnValueOnce('434');
			getVersionSpy.mockReturnValueOnce('1.5.0');
			getBundleIdSpy.mockReturnValueOnce('in.janis.picking');
			getSystemNameSpy.mockReturnValueOnce('android');
			getSystemVersionSpy.mockReturnValueOnce('13');
			getUniqueIdSpy.mockReturnValueOnce('34hf83hf89ahfjo');
			getModelSpy.mockReturnValueOnce('Pixel 2');

			expect(getJanisHeaders()).toStrictEqual({
				'janis-app-name': 'Janis Orders App',
				'janis-app-build': '434',
				'janis-app-version': '1.5.0',
				'janis-app-package-name': 'in.janis.picking',
				'janis-app-device-os-name': 'android',
				'janis-app-device-os-version': '13',
				'janis-app-device-id': '34hf83hf89ahfjo',
				'janis-app-device-name': 'Pixel 2',
			});
		});

		it('returns the headers with empty values when the device data could not be obtained', () => {
			getApplicationNameSpy.mockReturnValueOnce(null);
			getBuildNumberSpy.mockReturnValueOnce(null);
			getVersionSpy.mockReturnValueOnce(null);
			getBundleIdSpy.mockReturnValueOnce(null);
			getSystemNameSpy.mockReturnValueOnce(null);
			getSystemVersionSpy.mockReturnValueOnce(null);
			getUniqueIdSpy.mockReturnValueOnce(null);
			getModelSpy.mockReturnValueOnce(null);

			expect(getJanisHeaders()).toStrictEqual({
				'janis-app-name': '',
				'janis-app-build': '',
				'janis-app-version': '',
				'janis-app-package-name': '',
				'janis-app-device-os-name': '',
				'janis-app-device-os-version': '',
				'janis-app-device-id': '',
				'janis-app-device-name': '',
			});
		});
	});

	describe('getReachabilityUrl', () => {
		it.each([
			['in.janis.picking', 'https://app.janis.in'],
			['in.janis.picking.qa', 'https://app.janisqa.in'],
			['in.janis.picking.beta', 'https://app.janisdev.in'],
		])('returns the connectivity check url for the environment', (bundleId, reachabilityUrl) => {
			getBundleIdSpy.mockReturnValueOnce(bundleId);

			expect(getReachabilityUrl()).toStrictEqual(reachabilityUrl);
		});

		it('falls back to the production url when the environment cannot be resolved', () => {
			getBundleIdSpy.mockReturnValueOnce('com.example.otherapp');

			expect(getReachabilityUrl()).toStrictEqual('https://app.janis.in');
		});
	});
});
