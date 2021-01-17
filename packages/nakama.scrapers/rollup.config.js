import { lambaConfig } from '../../config/rollup-common';
import copy from 'rollup-plugin-copy';

export default [
  lambaConfig('./src/modules/units/image-scraper.ts', {
    plugins: [
      copy({
        targets: [
          {
            src: '../../node_modules/pngquant-bin/vendor/pngquant',
            dest: './dist/modules/units/image-scraper/node_modules/.bin'
          }
        ]
      })
    ]
  }),
  lambaConfig('./src/modules/units/unit-scraper.ts')
];
