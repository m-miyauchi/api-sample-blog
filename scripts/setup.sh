#!/bin/sh
docker-compose up -d &&
sleep 10;
docker-compose exec db psql -U postgres -c "CREATE DATABASE blog;"
./node_modules/.bin/ts-node ./scripts/create_member.ts
docker-compose down
