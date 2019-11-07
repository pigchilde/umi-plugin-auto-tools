# umi-plugin-auto-tools

[![NPM version](https://img.shields.io/npm/v/umi-plugin-auto-tools.svg?style=flat)](https://npmjs.org/package/umi-plugin-auto-tools)
[![NPM downloads](http://img.shields.io/npm/dm/umi-plugin-auto-tools.svg?style=flat)](https://npmjs.org/package/umi-plugin-auto-tools)

Umi 项目自动构建功能增强
 - 增加时间戳
 - 编译时配制需要保留的文件

## Install

```js
npm i umi-plugin-auto-tools --save-dev
```
## Update

```js
npm i umi-plugin-auto-tools@latest --save-dev
```
 
## Usage

Configure in `.umirc.js`,

```js
export default {
  plugins: [
    [
      'umi-plugin-auto-tools', 
      {
        enable: true, // 插件开关，默认为fasle 
        reservedFiles: ['img/img1/1.png'], // 可选项，配置需要保留的相对于dist文件夹的文件列表，Version.txt可以不用配置，默认直接支持保留
        timestampFiles: ['umi.css', 'umi.js'] // 需要增加时间戳的文件列表
      }
    ],
  ],
}
```

## Options

TODO
- 增加自动生成Version记录功能
- 增加全局通用组件的自动化拉取

## LICENSE

MIT
