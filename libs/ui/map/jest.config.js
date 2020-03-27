module.exports = {
  name: 'ui-map',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/ui/map',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
