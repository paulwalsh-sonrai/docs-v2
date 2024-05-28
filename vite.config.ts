import react from '@vitejs/plugin-react-swc';
import mdx from '@mdx-js/rollup';
import vike from 'vike/plugin';
import { UserConfig } from 'vite';

export default {
  plugins: [
    vike({
      prerender: true,
    }),
    mdx(),
    react(),
  ],
} as UserConfig;
