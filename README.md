# b1-to-b0-convertor

![npm (scoped)](https://img.shields.io/npm/v/b1-to-b0-convertor?style=for-the-badge) ![npm bundle size (scoped)](https://img.shields.io/npm/l/b1-to-b0-convertor?style=for-the-badge)


JavaScript version of the python script [`BitBucketConverter.py`](https://github.com/Portisch/RF-Bridge-EFM8BB1/blob/master/BitBucketConverter.py) written by [Portisch](https://github.com/Portisch). Useful to convert raw RF data from B1 format to B0 format. I use it prior to sending RF signals through a [Sonoff RF Bridge](https://sonoff.tech/product/smart-home-security/rf-bridge/) running [Tasmota](https://tasmota.github.io/docs/).

The package is nothing more than a single value convertor, it is meant to be used within other projects. It takes a single argument containing the B1 value itself. It won't extract the info from the logs of the Tasmota console (e.g. `{"RfRaw":{"Data": "AA B1 ........"}}`)

## Usage

```js
const convertB1toB0 = require('b1-to-b0-convertor');
console.log(convertB1toB0('AA B1 04 1360 0276 0122 1388 38192A192A1A1A19292A1A19292929292A19292A1929292A1A192A192A1A19292A1A1A1A1A1A1A1A192A1A1A1A1A1A1A1A1A1A1A1A192A192929292A1A19292A1A19 55'));
// AA B0 4C 04 08 1360 0276 0122 1388 38192A192A1A1A19292A1A19292929292A19292A1929292A1A192A192A1A19292A1A1A1A1A1A1A1A192A1A1A1A1A1A1A1A1A1A1A1A192A192929292A1A19292A1A19 55
```
