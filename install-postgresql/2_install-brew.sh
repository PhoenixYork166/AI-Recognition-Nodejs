#!/bin/bash 

echo "Pulling 'brew' command";
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)";
echo "";

echo "Appending 'brew' command to bash env";
echo 'export PATH="/opt/homebrew/bin:$PATH"' >> ~/.bash_profile;
if [[ $? -ne 0 ]]; then
    echo "";
    echo "Failed to append 'brew' command to Bash env";
    echo ""
    exit 1;
else
    echo "";
    echo "Succeeded in appending 'brew' command to Bash env";
    echo "";
fi

echo "";
echo "Applying changes to ~/.bash_profile ...";
echo "";
source ~/.bash_profile;

if [[ $? -ne 0 ]]; then
    echo "";
    echo "Failed to apply changes to ~/.bash_profile ...";
    echo "Exiting with Errors..."
    exit 1;
else
    echo "";
    echo "Succeeded in applying changes to ~/.bash_profile";
    echo "";
    echo "brew --version to verify successfuly installation in Bash";
    echo "";
    exit 0;
fi