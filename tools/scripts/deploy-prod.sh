#!/bin/bash

echo 'PROD Deploy - Started'

node ./node_modules/.bin/standard-version
node ./tools/scripts/copy-assets.js
node ./node_modules/.bin/shipit prod deploy
echo 'git push' && git push --follow-tags origin master
