#!/bin/bash

# Prompting the user to enter postgreSQL Root account
read -p "Enter your PostgreSQL root account name: " postgresRoot
createdb -U $postgresRoot 'smart-brain';

if [[ $? -ne 0 ]]; 
then
    echo "";
    echo "Failed to create database 'smart-brain' using PostgreSQL...";
    echo "Exiting with Error...";
    exit 1;
else
    echo ""
    echo "Succeeded in creating 'smart-brain' using PostgreSQL!";
    exit 0;
fi