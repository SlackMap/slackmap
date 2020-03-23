module.exports = {
  name: 'ui-core',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/ui/core',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
