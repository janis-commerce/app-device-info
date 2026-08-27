# Changelog

## [Unreleased]

## [1.5.0] - 2026-08-27

### Added

- Consumers can now get the connectivity check URL for the running environment with `getReachabilityUrl()`, and the device identification headers already mapped with `getJanisHeaders()`, instead of declaring the domain and rewriting the header mapping on their side [APPSRN-539](https://janiscommerce.atlassian.net/browse/APPSRN-539)

### Changed

- **Internal** The README is no longer regenerated and auto-committed on every tag, so what is written in it survives a release [APPSRN-539](https://janiscommerce.atlassian.net/browse/APPSRN-539)
- Importing the package no longer overrides the connectivity check configuration: an app that sets its own timeouts and reachability test keeps them instead of silently losing them depending on module load order [APPSRN-539](https://janiscommerce.atlassian.net/browse/APPSRN-539)
- An app that never calls `NetInfo.configure()` now checks connectivity against the NetInfo default host instead of the Janis one the package used to force on import. Nothing breaks — `getNetworkState()` and `getInternetReachability()` keep working — but to check against a Janis domain the app has to configure it, and the README shows how: the URL alone is not enough, `reachabilityTest` and `useNativeReachability` have to go with it [APPSRN-539](https://janiscommerce.atlassian.net/browse/APPSRN-539)

## [1.4.0] - 2026-03-25

### Added

- getEnvironment function

## [1.3.0] - 2026-02-21

### Added

- Support for React Native 0.80.2 [APPSRN-469](https://janiscommerce.atlassian.net/browse/APPSRN-469)
- CJS build output (`dist/`) to support `require()` in Node.js environments [APPSRN-469](https://janiscommerce.atlassian.net/browse/APPSRN-469)
- `exports` field with `react-native`, `require` and `default` conditions for correct module resolution across Metro, Node.js and bundlers [APPSRN-469](https://janiscommerce.atlassian.net/browse/APPSRN-469)
- `build` and `prepublishOnly` scripts to auto-generate `dist/` on publish [APPSRN-469](https://janiscommerce.atlassian.net/browse/APPSRN-469)

### Changed

- Updated `react` peer dependency range to `>=17.0.2 <20.0.0` [APPSRN-469](https://janiscommerce.atlassian.net/browse/APPSRN-469)
- Updated `react-native` peer dependency range to `>=0.71.5 <0.82.0` [APPSRN-469](https://janiscommerce.atlassian.net/browse/APPSRN-469)
- Moved `@react-native-community/netinfo` and `react-native-device-info` from `dependencies` to `peerDependencies` [APPSRN-469](https://janiscommerce.atlassian.net/browse/APPSRN-469)
- Upgraded Node.js to 22 in all CI workflows and `.nvmrc` [APPSRN-469](https://janiscommerce.atlassian.net/browse/APPSRN-469)
- Updated `actions/checkout` and `actions/setup-node` to v4 across all workflows [APPSRN-469](https://janiscommerce.atlassian.net/browse/APPSRN-469)

## [1.2.0] - 2024-10-31

### Added

- getAppInfo method [APPSRN-441](https://janiscommerce.atlassian.net/browse/APPSRN-441)

## [1.1.0] - 2024-04-03

### Changed

- flag private to public in npm publish action

## [1.0.0] - 2024-03-26

### Added

- Added new original methods to get more device information. [APPSRN-280](https://janiscommerce.atlassian.net/browse/APPSRN-280)
- Added the export of the device-info and net-info methods [APPSRN-280](https://janiscommerce.atlassian.net/browse/APPSRN-280)
