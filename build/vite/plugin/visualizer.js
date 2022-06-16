import visualizer from 'rollup-plugin-visualizer';
import { isReportMode } from '../../utils.js';

export const configVisualizer = () =>
  isReportMode() ?
    visualizer({
      filename: './node_modules/.cache/visualizer/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    }) :
    []