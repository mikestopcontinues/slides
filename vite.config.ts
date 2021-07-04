// import

import path from 'path';

import legacy from '@vitejs/plugin-legacy';
import reactRefresh from '@vitejs/plugin-react-refresh';
import globby from 'globby';
import {defineConfig} from 'vite';
import html from 'vite-plugin-html';
import reactJsx from 'vite-react-jsx';

// vars

const isProd = process.env.NODE_ENV === 'production';

const htmlHead = `
    <!-- meta -->
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- icons -->
    <link href="/icon/favicon.svg" rel="icon" />
    <link href="/icon/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
    <link href="/icon/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />

    <!-- android -->
    <link href="/icon/manifest.json" rel="manifest" />

    <!-- ios -->
    <link href="/icon/apple-touch-iocn.png" rel="apple-touch-icon" sizes="180x180" />
    <meta content="SiteArcade Slides & Handouts" name="apple-mobile-web-app-title" />

    <!-- edge -->
    <meta content="/icon/browserconfig.xml" name="msapplication-config" />
    <meta content="#f6f8f9" name="msapplication-TileColor" />

    <!-- fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Bungee&family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />

    <!-- js -->
    <script type="module" src="./index.tsx"></script>
`.trimStart();

// config

const inputs = globby.sync('20[0-9][0-9]/**/index.html').reduce((acc, file) => {
  acc[file.slice(0, -11)] = path.resolve(__dirname, file);

  return acc;
}, {});

// export

// INFO: https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    legacy(),
    reactRefresh(),
    reactJsx(),
    html({
      minify: isProd,
      inject: {
        injectData: {
          title: 'SiteArcade Slides & Handouts',
          head: htmlHead,
        },
        tags: [],
      },
    }),
  ],

  resolve: {
    alias: {
      app: path.resolve(__dirname, './app'),
    },
  },

  server: {
    https: true,
  },

  build: {
    outDir: '.out',
    rollupOptions: {
      input: {
        home: path.resolve(__dirname, 'index.html'),
        ...inputs,
      },
    },
  },
});
