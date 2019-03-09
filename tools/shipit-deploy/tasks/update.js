"use strict";

exports.__esModule = true;
exports.default = void 0;

var _shipitUtils = _interopRequireDefault(require("shipit-utils"));

var _posix = _interopRequireDefault(require("path2/posix"));

var _moment = _interopRequireDefault(require("moment"));

var _chalk = _interopRequireDefault(require("chalk"));

var _util = _interopRequireDefault(require("util"));

var _rmfr = _interopRequireDefault(require("rmfr"));

var _lodash = _interopRequireDefault(require("lodash"));

var _extendShipit = _interopRequireDefault(require("shipit-deploy/lib/extendShipit"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * Update task.
 * - Set previous release.
 * - Set previous revision.
 * - Create and define release path.
 * - Copy previous release (for faster rsync)
 * - Set current revision and write REVISION file.
 * - Remote copy project.
 * - Remove workspace.
 */
const updateTask = (shipit, options) => {
  if(!options) {
    options = {};
  }
  const name = options.name || 'deploy';
  
  _shipitUtils.default.registerTask(shipit, name+':update',
  /*#__PURE__*/
  _asyncToGenerator(function* () {
    (0, _extendShipit.default)(shipit);
    /**
     * Copy previous release to release dir.
     */

    function copyPreviousRelease() {
      return _copyPreviousRelease.apply(this, arguments);
    }
    /**
     * Create and define release path.
     */


    function _copyPreviousRelease() {
      _copyPreviousRelease = _asyncToGenerator(function* () {
        const copyParameter = shipit.config.copy || '-a';
        if (!shipit.previousRelease || shipit.config.copy === false) return;
        shipit.log('Copy previous release to "%s"', shipit.releasePath);
        yield shipit.remote(_util.default.format('cp %s %s/. %s', copyParameter, _posix.default.join(shipit.releasesPath, shipit.previousRelease), shipit.releasePath));
      });
      return _copyPreviousRelease.apply(this, arguments);
    }

    function createReleasePath() {
      return _createReleasePath.apply(this, arguments);
    }
    /**
     * Remote copy project.
     */


    function _createReleasePath() {
      _createReleasePath = _asyncToGenerator(function* () {
        /* eslint-disable no-param-reassign */
        shipit.releaseDirname = _moment.default.utc().format('YYYYMMDDHHmmss');
        shipit.releasePath = _posix.default.join(shipit.releasesPath, shipit.releaseDirname);
        /* eslint-enable no-param-reassign */

        shipit.log('Create release path "%s"', shipit.releasePath);
        yield shipit.remote(`mkdir -p ${shipit.releasePath}`);
        shipit.log(_chalk.default.green('Release path created.'));
      });
      return _createReleasePath.apply(this, arguments);
    }

    function remoteCopy() {
      return _remoteCopy.apply(this, arguments);
    }
    /**
     * Set shipit.previousRevision from remote REVISION file.
     */


    function _remoteCopy() {
      _remoteCopy = _asyncToGenerator(function* () {
        const options = _lodash.default.get(shipit.config, 'deploy.remoteCopy') || {
          rsync: '--del'
        };
        const rsyncFrom = shipit.config.rsyncFrom || shipit.workspace;

        const uploadDirPath = _posix.default.resolve(rsyncFrom, shipit.config.dirToCopy || '');

        shipit.log('Copy project to remote servers.');
        yield shipit.remoteCopy(`${uploadDirPath}/`, shipit.releasePath, options);
        shipit.log(_chalk.default.green('Finished copy.'));
      });
      return _remoteCopy.apply(this, arguments);
    }

    function setPreviousRevision() {
      return _setPreviousRevision.apply(this, arguments);
    }
    /**
     * Set shipit.previousRelease.
     */


    function _setPreviousRevision() {
      _setPreviousRevision = _asyncToGenerator(function* () {
        /* eslint-disable no-param-reassign */
        shipit.previousRevision = null;
        /* eslint-enable no-param-reassign */

        if (!shipit.previousRelease) return;
        const revision = yield shipit.getRevision(shipit.previousRelease);

        if (revision) {
          shipit.log(_chalk.default.green('Previous revision found.'));
          /* eslint-disable no-param-reassign */

          shipit.previousRevision = revision;
          /* eslint-enable no-param-reassign */
        }
      });
      return _setPreviousRevision.apply(this, arguments);
    }

    function setPreviousRelease() {
      return _setPreviousRelease.apply(this, arguments);
    }
    /**
     * Set shipit.currentRevision and write it to REVISION file.
     */


    function _setPreviousRelease() {
      _setPreviousRelease = _asyncToGenerator(function* () {
        /* eslint-disable no-param-reassign */
        shipit.previousRelease = null;
        /* eslint-enable no-param-reassign */

        const currentReleaseDirname = yield shipit.getCurrentReleaseDirname();

        if (currentReleaseDirname) {
          shipit.log(_chalk.default.green('Previous release found.'));
          /* eslint-disable no-param-reassign */

          shipit.previousRelease = currentReleaseDirname;
          /* eslint-enable no-param-reassign */
        }
      });
      return _setPreviousRelease.apply(this, arguments);
    }

    function setCurrentRevision() {
      return _setCurrentRevision.apply(this, arguments);
    }

    function _setCurrentRevision() {
      _setCurrentRevision = _asyncToGenerator(function* () {
        shipit.log('Setting current revision and creating revision file.');
        const response = yield shipit.local(`git rev-parse ${shipit.config.branch}`, {
          cwd: shipit.workspace
        });
        /* eslint-disable no-param-reassign */

        shipit.currentRevision = response.stdout.trim();
        /* eslint-enable no-param-reassign */

        yield shipit.remote(`echo "${shipit.currentRevision}" > ${_posix.default.join(shipit.releasePath, 'REVISION')}`);
        shipit.log(_chalk.default.green('Revision file created.'));
      });
      return _setCurrentRevision.apply(this, arguments);
    }

    function removeWorkspace() {
      return _removeWorkspace.apply(this, arguments);
    }

    function _removeWorkspace() {
      _removeWorkspace = _asyncToGenerator(function* () {
        if (shipit.config.shallowClone) {
          shipit.log(`Removing workspace "${shipit.workspace}"`);
          yield (0, _rmfr.default)(shipit.workspace);
          shipit.log(_chalk.default.green('Workspace removed.'));
        }
      });
      return _removeWorkspace.apply(this, arguments);
    }

    yield setPreviousRelease();
    // yield setPreviousRevision();
    yield createReleasePath();
    yield copyPreviousRelease();
    yield remoteCopy();
    // yield setCurrentRevision();
    // yield removeWorkspace();
    shipit.emit('updated');
  }));
};

var _default = updateTask;
exports.default = _default;
