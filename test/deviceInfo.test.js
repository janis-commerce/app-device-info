import {
	getAppInfo,
	getDeviceInfoForHeaders,
	getDeviceModel,
	getDeviceScreenMeasurements,
	getOSVersion,
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
			['im.janis.picking.beta', 'beta'],
			['im.janis.picking.qa', 'qa'],
			['im.janis.picking', 'prod'],
		])('returns an object with the app name and environment', (bundleId, environment) => {
			getApplicationNameSpy.mockReturnValueOnce('Janis Orders App');
			getBundleIdSpy.mockReturnValueOnce(bundleId);

			const appInfo = getAppInfo();

			expect(appInfo).toStrictEqual({
				appName: 'Janis Orders App',
				environment,
			});
		});

		it('returns an object with empty data for app info when these could not be obtained', () => {
			getApplicationNameSpy.mockReturnValueOnce(null);
			getBundleIdSpy.mockReturnValueOnce(null);

			const appInfo = getAppInfo();

			expect(appInfo).toStrictEqual({
				appName: '',
				environment: '',
			});
		});
	});
});
