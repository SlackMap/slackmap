module.exports = {
  name: 'ui-pwa',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/ui/pwa',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
