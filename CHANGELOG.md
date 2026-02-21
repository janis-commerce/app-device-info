# Changelog

## [Unreleased]

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
