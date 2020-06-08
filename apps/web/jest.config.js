module.exports = {
  name: 'web',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/web',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
