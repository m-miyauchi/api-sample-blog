#!/bin/sh
docker-compose up -d &&
sleep 5;
docker-compose exec db psql -U postgres -c "DROP DATABASE blog;"
docker-compose down
