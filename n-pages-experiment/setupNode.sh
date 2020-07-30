#!/bin/bash
set -e

# Mount local SSD
df -h
lsblk
sudo mkfs /dev/nvme1n1
sudo mkdir -p /poc/local-ssd
sudo chown ec2-user /poc
sudo mount /dev/nvme1n1 /poc/local-ssd
sudo chown ec2-user /poc/local-ssd
ls -l /poc/local-ssd

# Mount tmpfs
sysmem=$(cat /proc/meminfo | grep MemTotal | awk -F ' ' '{print $2}')
tmpfsSize=$(expr $sysmem / 2)

mkdir -p /poc/tmpfs
sudo mount -t tmpfs -o size=$tmpfsSize tmpfs /poc/tmpfs
sudo chown ec2-user /poc/tmpfs
ls -l /poc/tmpfs

# Install tools
# nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

nvm install node
npm install -g yarn
npm install -g json2csv
