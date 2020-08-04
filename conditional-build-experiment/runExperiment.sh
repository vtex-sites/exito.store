#!/bin/bash

export NODE_OPTIONS=--max_old_space_size=8192

END=5
# export PRODUCTS=5000

# node ../n-pages-experiment/addPaths.js

echo "Testing simple build ✨✨✨✨✨"
for ((i=1;i<=END;i++)); do
  yarn --cwd ./../ clean
  yarn --cwd ./../ simple-build | tee ./raw-results/simple-result-$i.txt
done
echo "Simple build test ended ✨✨✨✨✨"

echo "Testing conditional build 🔪🔪🔪🔪"
yarn --cwd ./../ clean
for ((i=1;i<=END;i++)); do
  yarn --cwd ./../ conditional-build | tee ./raw-results/conditional-result-$i.txt
done
echo "Conditional build test ended 🔪🔪🔪🔪"
