#!/bin/sh
docker-compose up -d &&
sleep 5;
docker-compose exec db-test psql -U postgres -c "DROP DATABASE commmit;"
docker-compose down
