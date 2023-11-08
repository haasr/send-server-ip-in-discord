#! /bin/bash -

printf "Downloading Node.js v20.8.0 Archive.."
wget https://nodejs.org/dist/v20.8.0/node-v20.8.0-linux-x64.tar.xz

printf "\nExtracting.."
tar -xf node-v20.8.0-linux-x64.tar.xz

printf "\nCopying to /usr/local/ .."
sudo cp -r node-v20.8.0-linux-x64/* /usr/local/

printf "\nChecking node & npm versions.."

printf "Node version: $(node --version)"
printf "\nNPM version:  $(npm --version)"
printf "\nAssuming the node and npm versions were printed,"
printf "\nyou may now delete the local node-v20[...] folder"
printf "\nand archive."
