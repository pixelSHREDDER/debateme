#!/usr/bin/env bash

DIR="$(cd "$(dirname "$0")" && pwd)"
source $DIR/setenv.sh
docker-compose up -d
echo '🟡 - Waiting for database to be ready...'
$DIR/wait-for-it.sh "${POSTGRES_DOCKER_URL}" -- echo '🟢 - Database is ready!'
yarn prisma migrate dev --name init
if [ "$#" -eq  "0" ]
  then
    npx playwright test --workers 1
else
    npx playwright test --headed --workers 1
fi
npx playwright show-report