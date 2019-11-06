import { join } from 'path';

export default {
  plugins: [
    ['../lib/index.js',{
      timestampFiles: ['umi.css', 'umi.js']
    }]
  ],
}
