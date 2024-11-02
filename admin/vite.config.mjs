import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import jsconfigPaths from 'vite-jsconfig-paths';

export default defineConfig(() => {
  // this sets a default port to 3000
  const PORT = `${'3000'}`;

  return {
    server: {
      // this ensures that the browser opens upon server start
      open: true,
      port: PORT
    },
    define: {
      global: 'window'
    },
    resolve: {
      //     alias: [
      //       {
      //         find: /^~(.+)/,
      //         replacement: path.join(process.cwd(), 'node_modules/$1')
      //       },
      //       {
      //         find: /^src(.+)/,
      //         replacement: path.join(process.cwd(), 'src/$1')
      //       }
      //     ]
    },
    preview: {
      // this ensures that the browser opens upon preview start
      open: true,
      port: PORT
    },
    base: "",
    plugins: [react(), jsconfigPaths()]
  };
});
