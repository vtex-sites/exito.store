#!/bin/bash

export NODE_OPTIONS=--max_old_space_size=8192

END=1

yarn --cwd ./../ clean
echo "Testing simple build ✨✨✨✨✨"
for ((i=1;i<=END;i++)); do
  yarn --cwd ./../ simple-build
done
echo "Simple build test ended ✨✨✨✨✨"

echo "Testing conditional build 🔪🔪🔪🔪"
yarn --cwd ./../ clean
for ((i=1;i<=END;i++)); do
  yarn --cwd ./../ conditional-build
done
echo "Conditional build test ended 🔪🔪🔪🔪"
