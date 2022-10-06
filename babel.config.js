module.exports = {
  presets: [['@babel/preset-env', {
    targets: {
      node: true,
    },
  }], ['next/babel', {
    targets: {
      node: false,
    },
  }]],
};
