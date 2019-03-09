#!/bin/bash

echo 'TEST Deploy - Started'

node ./node_modules/.bin/standard-version --prerelease BUILD.$TRAVIS_BUILD_NUMBER --skip.tag=true --skip.commit=true
node ./tools/scripts/copy-assets.js
node ./node_modules/.bin/shipit test deploy
