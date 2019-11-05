import { join } from 'path';

export default {
  plugins: [
    ['../src/index.js',{
      timestampFiles: ['umi.css', 'umi.js']
    }]
  ],
}
