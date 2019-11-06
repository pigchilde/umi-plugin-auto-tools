# umi-plugin-auto-tools

[![NPM version](https://img.shields.io/npm/v/umi-plugin-auto-tools.svg?style=flat)](https://npmjs.org/package/umi-plugin-auto-tools)
[![NPM downloads](http://img.shields.io/npm/dm/umi-plugin-auto-tools.svg?style=flat)](https://npmjs.org/package/umi-plugin-auto-tools)

Umi 项目自动构建功能增强
 - 增加时间戳
 - 编译时避免Version.txt文件的删除(保证Version.txt文件名首字母大写，以及不加S)

## Install

```js
npm i umi-plugin-auto-tools --save-dev
```
## Update

```js
npm i umi-plugin-auto-tools@0.0.4 // @后为最新版本
```
 
## Usage

Configure in `.umirc.js`,

```js
export default {
  plugins: [
    [
      'umi-plugin-auto-tools', 
      {
        timestampFiles: ['umi.css', 'umi.js'] // 需要增加时间戳的文件列表
      }
    ],
  ],
}
```

## Options

TODO
- 增加自动生成Version记录功能

## LICENSE

MIT
