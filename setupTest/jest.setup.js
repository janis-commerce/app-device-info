jest.mock('react-native-device-info', () => {
	const RNDeviceInfo = jest.requireActual(
		'react-native-device-info/jest/react-native-device-info-mock',
	);
	return {
		...RNDeviceInfo,
	};
});
