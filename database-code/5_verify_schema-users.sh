#!/bin/bash

# Prompting the user to enter postgreSQL Root account
read -p "Enter your PostgreSQL root account name: " postgresRoot
psql -p 5432 -U $postgresRoot -d 'smart-brain' -c "\d users";

echo "";
echo "Upon completion of verifying table named 'users' schema...";
echo "Please HIT 'q' key to exit";
echo "";