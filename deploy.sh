#/bin/bash
rm -rf consumerportal
export PATH=$PATH:/usr/local/bin
source ~/.profile
export NODE_PATH=/home/staging/.nvm/versions/node/v10.9.0/bin/node
export USER=staging
export HOME=/home/staging
source $HOME/.nvm/nvm.sh
nvm use v10.9.0
set -e
git clone -b staging git@bitbucket.org:exypnosdev/consumerportal.git
cd consumerportal
mv sample-env.txt .env
npm install
npm run build
pm2 restart npm -- run start-prod --