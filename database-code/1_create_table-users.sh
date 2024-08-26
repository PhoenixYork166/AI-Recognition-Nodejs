#!/bin/bash

# Prompting the user to enter postgreSQL Root account
read -p "Enter your PostgreSQL root account name: " postgresRoot
psql -p 5432 -U $postgresRoot -d 'smart-brain' -c "CREATE TABLE users (id serial PRIMARY KEY, name VARCHAR(100), email text UNIQUE NOT NULL, entries BIGINT DEFAULT 0, joined TIMESTAMP NOT NULL, raw_hex TEXT);";

if [[ $? -ne 0 ]]; 
then
    echo "";
    echo "Failed to create table 'users' in database 'smart-brain' ";
    echo "Exiting with Error...";
    exit 1;
else
    echo ""
    echo "Succeeded in creating table 'users' in database 'smart-brain' ";
    echo "";

    echo "Displaying table schema for 'users': ";
    psql -p 5432 -U $postgresRoot -d 'smart-brain' -c "\d users";
    echo "Please HIT 'q' key to exit";
    echo "";
fi