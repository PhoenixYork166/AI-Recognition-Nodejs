#!/bin/bash

echo "Appending 'psql' command to bash env";
echo "";

echo 'export PATH="/opt/homebrew/opt/postgresql@15/bin:$PATH"' >> ~/.bash_profile;
echo "";

echo "Applying new ~/.bash_profile";
source ~/.bash_profile;

echo "";