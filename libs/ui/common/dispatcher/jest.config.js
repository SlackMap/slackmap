module.exports = {
  name: 'ui-common-dispatcher',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/ui/common/dispatcher',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
