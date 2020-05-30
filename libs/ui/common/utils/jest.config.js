module.exports = {
  name: 'ui-common-utils',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/ui/common/utils',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
