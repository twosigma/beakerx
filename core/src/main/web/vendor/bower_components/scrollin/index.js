var tracking = [];
const throttle = require('lodash.throttle');

const _onScroll = throttle(() => window.requestAnimationFrame(checkForVisibleElements), 100, {leading: false});

function getTracking() {
  return tracking;
}

function isVisible(elm) {
  let rect = elm.getBoundingClientRect();

  return rect.bottom > 0 &&
    rect.right > 0 &&
    rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
    rect.top < (window.innerHeight || document.documentElement.clientHeight);
}

function _handleVisible(elm, fn, options) {
  untrack(elm);
  fn(elm);
}

function _trackNewElement(elm, fn, options) {
  if (isVisible(elm)) {
    return _handleVisible(elm, fn, options);
  }
  tracking.push({elm: elm, fn: fn, options: options});
}

function checkForVisibleElements() {
  tracking.slice(0).forEach((v) => {
    if (isVisible(v.elm)) {
      _handleVisible(v.elm, v.fn, v.options);
    }
  });

  if (tracking.length === 0) {
    untrackAll();
  }
}

function track(elm, fn, options) {
  if (typeof fn !== 'function') {
    throw new Error('You must pass a callback function');
  }

  window.requestAnimationFrame(() => {
    _trackNewElement(elm, fn, options);

    if (tracking.length === 1) {
      window.addEventListener('scroll', _onScroll);
    }
  });
}

function untrackAll() {
  tracking = [];
  window.removeEventListener('scroll', _onScroll);
}

function untrack(elm) {
  let elmIndex = -1;

  tracking.some((v, i) => {
    if (v.elm == elm) {
      elmIndex = i;
      return true;
    }
  });

  if (elmIndex !== -1) {
    tracking.splice(elmIndex, 1);
  }
}

export default {track, untrackAll, untrack, checkForVisibleElements, getTracking};
