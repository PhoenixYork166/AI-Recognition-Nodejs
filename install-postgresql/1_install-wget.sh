#!/bin/zsh

brew install wget;

if [[ $? -ne 0 ]]; then
    echo "";
    echo "Failed to install wget command";
    echo "";
else
    echo "";
    echo "Succeeded in installing wget command";
    echo "";
    exit 0;
fi

exit 0;