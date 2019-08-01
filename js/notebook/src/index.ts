/*
 *  Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

// Entry point for the notebook bundle containing custom model definitions.
//
// Setup notebook base URL
//
// Some static assets may be required by the custom widget javascript. The base
// url for the notebook is not known at build time and is therefore computed
// dynamically.

__webpack_public_path__ = document.querySelector('body').getAttribute('data-base-url') + 'nbextensions/beakerx/';

// Export widget models and views, and the npm package version number.
export * from './BxHTML';
export * from './Foldout';
export * from './HTMLPre';
export * from './RESTButton';
export * from './SparkUI';
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

export const version = require('../package.json').version;
