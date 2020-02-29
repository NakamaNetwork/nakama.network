const exec = require('child_process').execSync;
const path = require('path');

const buildConfigPath = path.join(__dirname, './codebuild-build-config.json');
exec(
  `aws codebuild update-project ` +
    `--cli-input-json "file://${buildConfigPath}"`
);
