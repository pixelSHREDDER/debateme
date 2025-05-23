#!/usr/bin/env bash

DIR="$(cd "$(dirname "$0")" && pwd)"
source $DIR/setenv.sh
docker-compose up -d
echo '🟡 - Waiting for database to be ready...'
$DIR/wait-for-it.sh "${POSTGRES_DOCKER_URL}" -- echo '🟢 - Database is ready!'
yarn prisma migrate dev --name init
storybook dev -p 6006