define(function() {
  return {
    DEFAULT_EVALUATOR: 'JavaScript',
    REQUIREJS_TIMEOUT: 30,
    RECONNECT_TIMEOUT: 30 * 1000, // 30 seconds
    CELL_INSTANTIATION_DISTANCE: 500, // in pixels - if the cell is closer than from the viewport it gets instantiated
    EVENTS: {
      RECONNECT_FAILED: 'reconnect-failed',
      LANGUAGE_MANAGER_SHOW_SPINNER: 'language-manager-show-spinner',
      LANGUAGE_MANAGER_HIDE_SPINNER: 'language-manager-hide-spinner',
      DISCARD_LANGUAGE_SETTINGS: 'discard-language-settings',
      HIGHLIGHT_EDITED_LANGUAGE_SETTINGS: 'highlight-edited-language-settings',
      SET_LANGUAGE_SETTINGS_EDITED: 'set-language-settings-edited',
      LANGUAGE_ADDED: 'languageAdded',
      CELL_OUTPUT_EXPANDED: 'cell-output-expanded',
      CELL_OUTPUT_LM_SHOWED: 'cell-output-lm-showed',
      ADVANCED_MODE_TOGGLED: 'advanced-mode-toggled',
      FILE_DROPPED: 'file-dropped'
    },
    FILE_LOCATION: {
      FILESYS: "file",
      HTTP: "http",
      AJAX: "ajax"
    },
    EVALUATOR_SPEC: {
      PROPERTIES: {
        STRING: "settableString",
        BOOLEAN: "settableBoolean",
        ENUM: "settableEnum",
        SELECT: "settableSelect"
      },
      ACTION: "action"
    },
    THEMES: {
      DEFAULT: 'default',
      AMBIANCE: 'ambiance'
    }
  };
});