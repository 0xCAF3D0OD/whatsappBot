#!/bin/bash

if [ $# -eq 0 ]; then
  echo "Aucun argument n'a été ajouté"
  exit 1
fi

find_container() {
  if [ -z "$container_id" ]; then
    container_id=$(docker ps -aq | head -n1)
  fi
  echo "$container_id"
}
#container_id=$(docker ps -qf "name=nom_du_container")


if [ "$1" = "z" ]; then
  docker system prune -af
  docker-compose up --build
elif [ "$1" = 'r' ]; then
  docker-compose up
elif [ "$1" = "nk" ]; then
  container_id=$(find_container)
  if [ -z "$container_id" ]; then
    echo "Conteneur non trouvé"
    exit 1
  fi
  docker exec -it $container_id /bin/bash
else
  echo "Argument non reconnu : $1"
  exit 1
fi