// import

import path from 'path';

import reactRefresh from '@vitejs/plugin-react-refresh';
import globby from 'globby';
import {defineConfig} from 'vite';
import reactJsx from 'vite-react-jsx';

// config

const inputs = globby.sync('*/index.html').reduce((acc, file) => {
  acc[file.slice(0, -11)] = path.resolve(__dirname, file);

  return acc;
}, {});

// export

// INFO: https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),
    reactJsx(),
  ],

  build: {
    rollupOptions: {
      input: {
        home: path.resolve(__dirname, 'index.html'),
        ...inputs,
      },
    },
  },
});
