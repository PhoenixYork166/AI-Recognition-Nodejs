#!/bin/bash

echo "Creating a testing database 'test' on PostgreSQL...";
echo "";

createdb 'test';

if [[ $? -ne 0 ]]; then
    echo "";
    echo "Failed to create 'test' postgres database";
    echo "Displaying Error code";
    echo "Exiting...";
    exit 1;
else
    echo "";
    echo "Succeeded in creating 'test' database on Postgres";
    echo "";
    exit 0;
fi

exit 0;