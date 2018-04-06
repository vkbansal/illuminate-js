#!/bin/bash
#

echo $TRAVIS_BRANCH

if ([ "$TRAVIS_BRANCH" != "master" ] && [ -z "$TRAVIS_TAG" ]) ||  [ "$TRAVIS_PULL_REQUEST" != "false" ];
then
	exit
fi

set -o errexit

# reset public dir
rm -rf public

# copy required files
yarn run gendocs
NODE_ENV=production webpack --config __website/webpack.config.js

cd public
git init

git config --global user.name "Travis CI"
git config --global user.email "${USER_EMAIL}"

git add .
git commit -m "Deploy to gh-pages"

git push --force --quiet "https://${GITHUB_TOKEN}@github.com/vkbansal/illuminate-js.git" master:gh-pages > /dev/null 2>&1
