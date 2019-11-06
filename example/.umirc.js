import { join } from 'path';

export default {
  plugins: [
    ['../lib/index.js',{
      enable: true, // 插件开关，默认为fasle 
      timestampFiles: ['umi.css', 'umi.js']
    }]
  ],
}
