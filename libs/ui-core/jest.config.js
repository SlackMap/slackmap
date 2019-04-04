module.exports = {
  name: 'ui-core',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/ui-core',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
};
