module.exports = {
  name: 'ui-common-errors',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/ui/common/errors',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
