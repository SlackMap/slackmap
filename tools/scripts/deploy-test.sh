#!/bin/bash

echo 'TEST Deploy - Started'

node ./node_modules/.bin/standard-version --prerelease $TRAVIS_BUILD_NUMBER  -t "" --skip.tag=true --skip.commit=true
node ./tools/scripts/copy-assets.js
node ./node_modules/.bin/shipit test deploy
