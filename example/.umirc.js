import { join } from 'path';

export default {
  plugins: [
    ['../src/index.js',{
      enable: true, // 插件开关，默认为fasle 
      //reservedFiles: ['img/img1/img.png', 'img.png'],
      timestampFiles: ['umi.css', 'umi.js']
    }],
  ],
}
