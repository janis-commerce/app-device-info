import {getInternetReachability, getNetworkState} from '../lib/netInfo.js';
import NetInfo from '@react-native-community/netinfo';

const fetchSpy = jest.spyOn(NetInfo, 'fetch');

describe('NetInfo utils', () => {
	it('getInternetReachability is an async function that should return a boolean representing the internet reachability state', async () => {
		fetchSpy.mockResolvedValueOnce({
			isInternetReachable: true,
		});

		const isInternetReachable = await getInternetReachability();
		expect(isInternetReachable).toBe(true);
	});

	describe('getNetworkState is an async function that returns an object representing the internet connection state', () => {
		it('When resolved correctly it should return an object that represents the state of the internet', async () => {
			fetchSpy.mockResolvedValueOnce({
				type: 'cellular',
				details: {
					cellularGeneration: '5g',
					carrier: 'movistar',
					isConnectionExpensive: true
				},
				isInternetReachable: true,
			});

			const state = await getNetworkState();

			expect(state).toStrictEqual({
				networkType: '5g',
				networkCarrier: 'movistar',
				networkStrength: '5g',
				isInternetReachable: true,
				details: {
					isConnectionExpensive: true
				},
			});
		});

		it('when the connection is wifi, the status reflects more detailed information', async () => {
			fetchSpy.mockResolvedValueOnce({
				type: 'wifi',
				details: {
					ipAddress: '101:06:1702',
					strength: 99,
					ssid:'ssid',
					bssid:'bssid'
				},
				isInternetReachable: true,
			});

			const state = await getNetworkState();

			expect(state).toStrictEqual({
				networkType: 'wifi',
				networkCarrier: '101:06:1702',
				networkStrength: 99,
				isInternetReachable: true,
				details: {
					ssid:'ssid',
					bssid:'bssid'
				},
			});
		});

		it('when connection type is none throwns an error and returns an object with the data', async () => {
			fetchSpy.mockResolvedValueOnce({
				type: 'none',
				details: {},
				isInternetReachable: false,
			});

			const state = await getNetworkState();

			expect(state).toStrictEqual({
				networkType: 'not available',
				networkCarrier: 'not available',
				networkStrength: 0,
				isInternetReachable: false,
				reason: 'Connection is not available',
				details: {},
			});
		});
	});
});
