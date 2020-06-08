module.exports = {
  name: 'ui-config',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/ui/config',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
