# ⏰ YouTube*
[![NPM version](https://img.shields.io/npm/v/yt-channel-gen.svg?maxAge=3600)](https://www.npmjs.com/package/yt-channel-gen)
[![NPM downloads](https://img.shields.io/npm/dt/yt-channel-gen.svg?maxAge=3600)](https://www.npmjs.com/package/yt-channel-gen)
[![Build status](https://travis-ci.com/lolPants/yt-channel-gen.svg)](https://travis-ci.com/lolPants/yt-channel-gen)
[![Dependencies](https://img.shields.io/david/lolpants/yt-channel-gen.svg?maxAge=3600)](https://david-dm.org/lolpants/yt-channel-gen)

_Enumerate all videos from a YouTube Channel as an async iterator_
Written in TypeScript, compiled down to ES5 for use in any Node.js version!

## 💾 Installation
The package is on the NPM registry as `yt-channel-gen`. Simply install it with your NPM client of choice.

## 🔧 Usage
```ts
// Import (CommonJS)
const { createGenerator } = require('yt-channel-gen')

// Import (ESM)
import { createGenerator } from 'yt-channel-gen'

// Create a generator
const generator = createGenerator('api key')
// Use the generator to create an async iterator
const channel = generator('channel id')
```
