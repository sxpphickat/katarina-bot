#!/bin/bash

mkdir -p ~/data/katarina-db

npm i 

docker compose up -d

npx prisma migrate dev --name init

npm run deamon
