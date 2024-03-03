#!/bin/bash

# Step 1: Build the Docker image for the node_app service
docker build -t docker_node_image .

# Step 2: Run the database service
docker run -d \
  --name project_docker_node_db \
  -e POSTGRES_PASSWORD=project_docker_node \
  -e POSTGRES_USER=project_docker_node \
  -e POSTGRES_DB=project_docker_node \
  -v $(pwd)/db/prod/volume:/var/lib/postgresql/data \
  -v $(pwd)/db/prod/conf/postgresql/my-postgres.conf:/etc/postgresql/postgresql.conf \
  -p 5432:5432 \
  --network project_docker_node \
  --restart no \
  postgres

# Step 3: Run the node_app service, making sure it depends on the database service
docker run -p 3000:3000 -v $(pwd):/usr/src/app --network project_docker_node --restart no --depends-on project_docker_node_db docker_node_image
