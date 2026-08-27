# @janiscommerce/app-device-info

![janis-logo](brand-logo.png)

Library of methods to get information about device.

This library provides all the methods of [react-native-device-info](https://www.npmjs.com/package/react-native-device-info) and [react-native-community/netinfo](https://www.npmjs.com/package/@react-native-community/netinfo), in addition own methods to obtain parsed information.

## PeerDependencies:

To work, this package depends on you installing the following libraries

```sh
    npm install react-native-device-info

    npm install @react-native-community/netinfo
```

## Install the dependency:

```sh
    npm install @janiscommerce/app-device-info
```

## Connectivity check

`getNetworkState()` and `getInternetReachability()` read the NetInfo configuration, which is shared across the whole app. This package does not set it: whatever the app configures is what these methods use.

If the app never calls `NetInfo.configure()`, NetInfo falls back to its own defaults and both methods still work.

To check connectivity against the Janis domain of the running environment, configure it in the app:

```js
import NetInfo from '@react-native-community/netinfo';
import {getReachabilityUrl} from '@janiscommerce/app-device-info';

NetInfo.configure({
	reachabilityUrl: getReachabilityUrl(),
	reachabilityTest: (response) => Promise.resolve(response.status >= 200 && response.status < 400),
	useNativeReachability: false,
});
```

`reachabilityTest` and `useNativeReachability` matter as much as the URL: with the defaults, NetInfo trusts the OS instead of requesting the URL, and its test expects a `204` while the Janis domains answer `200`.
