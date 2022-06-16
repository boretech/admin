import visualizer from 'rollup-plugin-visualizer';
import { isReportMode } from '../../utils';

export const configVisualizerConfig = () =>
  isReportMode() ?
    visualizer({
      filename: './node_modules/.cache/visualizer/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    }) :
    []