module.exports = {
  name: 'ui-spot',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/ui/spot',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
