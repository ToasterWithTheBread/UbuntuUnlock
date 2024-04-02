#!/bin/bash

# Check if NPM is installed
if ! command -v npm &> /dev/null
then
    echo "NPM is not installed. Installing NPM..."
    sudo apt-get update
    sudo apt-get install npm -y
else
    echo "NPM is already installed."
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "Node.js is not installed. Installing Node.js..."
    sudo apt-get install curl -y
    curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
    sudo apt-get install -y nodejs
else
    echo "Node.js is already installed."
fi

# Install pm2 globally
if ! command -v pm2 &> /dev/null
then
    echo "pm2 is not installed. Installing pm2 globally..."
    sudo npm install -g pm2
else
    echo "pm2 is already installed."
fi

# Install dependencies
echo "Installing required materials..."
npm install

# Save before starting
pm2 save

# Start service using pm2
echo "Starting UbuntuUnlock using pm2..."
pm2 start UbuntuUnlock.js

# Save current pm2 process list
pm2 save --force

# Set pm2 to startup on system boot
env_line=$(pm2 startup | grep "env")
eval "$env_line"

# Let user know that we are good
echo "UbuntuUnlock installed successfully."
