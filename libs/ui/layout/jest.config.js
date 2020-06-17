module.exports = {
  name: 'ui-layout',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/ui/layout',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
