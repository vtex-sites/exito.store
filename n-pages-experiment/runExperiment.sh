#!/bin/bash

export NODE_OPTIONS=--max_old_space_size=8192

products=( 1 )

for i in "${products[@]}"
do
  echo "--------------------> products: " $i
  export PRODUCTS=$i
  node addPaths.js
  yarn --cwd ./../ clean
  yarn --cwd ./../ build | tee ./raw-results/result-$i.txt
done

node ./results-sanitizer/sanitizer.js > results.json
