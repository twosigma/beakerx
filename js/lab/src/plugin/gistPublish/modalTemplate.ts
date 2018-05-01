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

export default `
<div>
  <form>
    <div class="form-group has-feedback">
      <label>Personal Access Token</label>
      <input required type="password" class="form-control">
    </div>
    <p class="help-block">
      <span>Enter a <a target="_blank" href="https://github.com/settings/tokens">Personal Access Token</a> to publish the notebook as a gist in your GitHub account.</span><br/>
      <span>We recommend your Token have only the <strong><i>gist</i></strong> scope.</span><br/>
      <span>For more information, read the <a  target="_blank" href="https://developer.github.com/apps/building-oauth-apps/scopes-for-oauth-apps/">documentation for scopes</a>.</span>
    </p>
  </form>
</div>
`;
