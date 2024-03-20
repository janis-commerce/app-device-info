import NetInfo from '@react-native-community/netinfo';

/***
 * @name getNetworkState
 * @description returns an objetct with the connection state
 * @returns {object}
 * @example
 * await getNetworkState() => {
 * networkType:'wifi',
 * networkCarrier:'1.707.52',
 * networkStrength: 99,
 * isInternetReachable: true
 * }
 */

export const getNetworkState = async () =>
	await NetInfo.fetch()
		.then((state) => {
			const {type, details, isInternetReachable} = state;

			if (type === 'none') throw new Error('Connection is not available');

			const isCellularConnection = type === 'cellular';
			const networkType = isCellularConnection ? details.cellularGeneration : type;
			const networkCarrier = isCellularConnection ? details.carrier : details.ipAddress;
			const networkStrength = isCellularConnection ? details.cellularGeneration : details.strength;

			return {
				networkType,
				networkCarrier,
				networkStrength,
				isInternetReachable,
			};
		})
		.catch((error) => {
			return {
				networkType: 'not available',
				networkCarrier: 'not available',
				networkStrength: 0,
				isInternetReachable: false,
				reason: error.message,
			};
		});

/***
 * @name getInternetReachability
 * @description returns a boolean that's represent if internet is reachable or not
 * @returns {boolean}
 * @example await getInternetReachability() => true;
 */

export const getInternetReachability = async () => {
	const {isInternetReachable} = await NetInfo.fetch();

	return isInternetReachable;
};
