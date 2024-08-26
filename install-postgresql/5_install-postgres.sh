#!/bin/bash

echo "Updating Homebrew on your mac OS...";
brew update;

if [[ $? -ne 0 ]]; then
    echo "";
    echo "Failed to update Homebrew...";
    echo "Exiting with Errors..."
    exit 1;
else
    echo "";
    echo "Succeeded in updating Homebrew 'brew' command";
    echo "";
    echo "brew doctor to check everything is OK on your mac OS";
    echo "";
fi

brew doctor;
if [[ $? -ne 0 ]]; then
    echo "";
    echo "Failed to 'brew doctor' for system check";
    echo "Exiting with Errors..."
    exit 1;
else
    echo "";
    echo "Succeeded in 'brew doctor' to check everything is OK";
    echo "";
    echo "Going to 'brew install postgresql' onto your macOS...";
    echo "";
fi

brew install postgresql;
if [[ $? -ne 0 ]]; then
    echo "";
    echo "Failed to install postgresql onto your mac OS...";
    echo "Exiting with Errors..."
    exit 1;
else
    echo "";
    echo "Succeeded in installing PostgreSQL onto your macOS...";
    echo "";
    echo "Preparing to 'brew services start postgresql'!";
    echo "";
fi

brew services start postgresql;
if [[ $? -ne 0 ]]; then
    echo "";
    echo "Failed to start PostgreSQL service on your macOS...";
    echo "Exiting with Errors..."
    exit 1;
else
    echo "";
    echo "Succeeded in starting PostgreSQL service on your macOS!";
    echo "";
    exit 0;
fi

exit 0;