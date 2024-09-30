#!/bin/bash

#dependencies=("alpinejs" "tailwindcss" "pinecone-router")
#
#check_and_install_dependency() {
#  local package=$1
#  if npm list "$package" --depht=0 &> /dev/null; then
#    echo "La dépendance $package est installée."
#  else
#    echo "La dépendance $package n'a pas encore été téléchargée."
#    echo "Installation de $package..."
#    if [ "$package" = "esbuild" ]; then
#      # Installation de esbuild
#      npm install --save-exact --save-dev "$package"
#    else
#      npm install -D "$package"
#    fi
#  fi
#}
#
#for dep in "${dependencies[@]}"; do
#  check_and_install_dependency "$dep"
#done
#
## Initialisation de Tailwind et génération du CSS
#npx tailwindcss init
#npx tailwindcss -i ./src/input.css -o ./src/tailwind.css

npm install

#lancement esbuild
#vite src/main.js --bundle --outfile=dist/bundle.js
npm run start