#!/bin/bash

echo "Appending 'psql' command to bash env";
echo 'export PATH="/opt/homebrew/opt/postgresql@15/bin:$PATH"' >> ~/.bash_profile;
echo "";

source ~/.bash_profile;