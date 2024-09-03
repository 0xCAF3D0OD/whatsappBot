#!bin/bash

if [ $# -eq 0 ]then
  echo "nothing is added"
fi

if [ "$1" -eq "z"]; then
  docker system prune -af
  docker-compose up --build
elif [ "$1" -eq "nk"]; then
  container_id=$(docker ps -qf "name=nom_du_container")
  if [ -z "$container_id" ]; then
    echo "Conteneur non trouvé"
    exit 1
  fi
  docker exec -it $container_id /bin/bash