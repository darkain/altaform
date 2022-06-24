#!/bin/sh

cd /var/www

git stash
git pull
git submodule update

/var/www/_scripts/af deploy/assets
