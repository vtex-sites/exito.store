#!/bin/bash

export NODE_OPTIONS=--max_old_space_size=8192

products=( 1 10 50 100 200 300 400 500 600 700 800 900 1000 2000 3000 4000 5000 9000 )

for i in "${products[@]}"
do
  echo "--------------------> products: " $i
  export PRODUCTS=$i
  node addPaths.js
  yarn --cwd ./../ clean
  yarn --cwd ./../ build | tee ./raw-results/result-$i.txt
done

node ./results-sanitizer/sanitizer.js > results.json
json2csv -i results.json -o results.csv
