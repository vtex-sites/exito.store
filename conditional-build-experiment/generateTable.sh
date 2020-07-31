#!/bin/bash

export NODE_OPTIONS=--max_old_space_size=8192

node ./sanitizer.js > results.json
json2csv -i results.json -o results.csv
