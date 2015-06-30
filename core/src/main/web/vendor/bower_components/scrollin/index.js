var tracking = [];
const throttle = require('lodash.throttle');

const _onScroll = throttle(() => window.requestAnimationFrame(checkForVisibleElements), 100, {leading: false});

function isVisible(elm) {
  let rect = elm.getBoundingClientRect();

  return rect.bottom > 0 &&
    rect.right > 0 &&
    rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
    rect.top < (window.innerHeight || document.documentElement.clientHeight);
}

function _handleVisible(elm, options) {
  untrack(elm);

  if (options.handler !== void 0) {
    options.handler(elm);
  }
}

function _trackNewElement(elm, options) {
  if (isVisible(elm)) {
    return _handleVisible(elm, options);
  }

  tracking.push({elm: elm, options: options});
}

function checkForVisibleElements() {
  tracking.forEach((v) => {
    if (isVisible(v.elm)) {
      _handleVisible(v.elm, v.options);
    }
  });

  if (tracking.length === 0) {
    window.removeEventListener('scroll', _onScroll);
  }
}

function track(elm, options) {
  window.requestAnimationFrame(() => _trackNewElement(elm, options));

  if (tracking.length === 0) {
    window.addEventListener('scroll', _onScroll);
  }
}

function untrackAll() {
  tracking = [];
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

export default {track, untrackAll, untrack, checkForVisibleElements};
