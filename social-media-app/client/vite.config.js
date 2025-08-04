// vite.config.js
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  return {
    base: env.VITE_APP_BASE || '/',
    plugins: [
      react(),
      svgr({
        expandProps: "start",
        defaultExport: 'component',
        svgo: true,
        svgoConfig: {
          plugins: [
            { removeViewBox: false },
            { removeDimensions: true },
            { removeAttrs: { attrs: '(svg:fill|svg:stroke)' } },
          ],
        },
        ref: false,
        memo: true,
        titleProp: false,
        include: '**/*.svg',
        svgrOptions: {
          replaceAttrValues: {
            '#[0-9A-Fa-f]{3,6}': '{props.fill || "$&"}',
          },
          svgProps: {
            className: "custom-svg",
            fill: 'none',
            stroke: 'none',
          },
        },
      }),
    ],
  };
});
