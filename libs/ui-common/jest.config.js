module.exports = {
  name: 'ui-common',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/ui-common',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
};
