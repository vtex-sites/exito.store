#!/bin/bash

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
