exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  capabilities: {
    browserName: 'firefox'
  },
  specs: [
          // 'tests/landingpageTime.js',
          // 'tests/landingpageMenu.js',
          'tests/language-manager.js'
  ]
}
