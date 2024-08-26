#!/bin/bash

# Prompting the user to enter postgreSQL Root account
read -p "Enter your PostgreSQL root account name: " postgresRoot
psql -p 5432 -U $postgresRoot -d 'smart-brain' -c "CREATE TABLE login (id serial PRIMARY KEY, hash varchar(100) NOT NULL, email text UNIQUE NOT NULL);";

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
    psql -p 5432 -U $postgresRoot -d 'smart-brain' -c "\d login";
    echo "Please HIT 'q' key to exit";
    echo "";
fi