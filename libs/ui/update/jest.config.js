module.exports = {
  name: 'ui-update',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/ui/update',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
};
