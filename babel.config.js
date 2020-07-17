const presets = [
  [
    '@babel/env',
    {
      targets: {
        ios: '12',
        edge: '15',
        ie: '11',
        firefox: '50',
        chrome: '64',
        safari: '11.1',
      },
      useBuiltIns: 'usage',
      corejs: '3.4.1',
    },
  ],
];

module.exports = { presets };
