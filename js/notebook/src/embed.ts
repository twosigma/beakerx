// Entry point for the unpkg bundle containing custom model definitions.
//
// It differs from the notebook bundle in that it does not need to define a
// dynamic baseURL for the static assets and may load some css that would
// already be loaded by the notebook otherwise.

// Export widget models and views, and the npm package version number.
import './shared/style/beakerx.scss';
import './shared/style/tree.scss';
import './shared/style/spark.scss';
import './plot/bko-combinedplot.css';
import './plot/bko-plot.css';

export * from './BxHTML';
export * from './Foldout';
export * from './HTMLPre';
export * from './SparkUI';
export * from './RESTButton';
export * from './SparkStateProgress';
export * from './SparkConfiguration';
export * from './SparkFoldout';
export * from './TabView';
export * from './GridView';
export * from './CyclingDisplayBox';
export * from './EasyForm';
export * from './Plot';
export * from './Spinner';
export * from './GistPublisher'
export * from './GistPublisherUtils'

export const PlotApi = require('./plot/plotApi');
export const bkCoreManager = require('beakerx_shared/lib/bk/bkCoreManager').default;

export const version = require('../package.json').version;

export const BeakerXApi = require('beakerx_shared/lib/api/BeakerXApi').default;