# AI-Recognition-API
## Live server: https://ai-recognition-backend.onrender.com/
![Node.js](https://qph.cf2.quoracdn.net/main-qimg-5450bd03a18170c9dec7e904ce7029e8)

## Server-side Node.js + Postgres15

# 1. Download this fun AI Node app
```bash
git clone https://github.com/PhoenixYork166/AI-Recognition-Nodejs.git;
```

# 2. Start using this Node app
```bash
npm install;
```

# 3. What if you do not have all the necessary Dev dependencies on your mac OS to start this Node app?

# 4. Go to ./install-postgresql
## Read through ./install-postgresql/0_postgresql_docs.txt

# 5. Installing mac OS Node.js dev dependencies
## i. Start installing necessary dependencies 'brew' command on your mac OS
```bash
bash ./install-postgresql/1_install-brew.sh;
```

## ii. Start installing 'wget' command on your mac OS
```bash
bash ./install-postgresql/2_install-wget.sh;
```

## iii. Adding 'psql' to your Bash env on your mac OS
```bash
bash ./install-postgresql/3_add-psql-to-bash.sh;
```

## iv. Downloading PSequel GUI (PSequel GUI is still crashing in 2024)...
```bash
bash ./install-postgresql/4_download-psequel-gui.sh;
```

## v. Installing PostgreSQL on your mac OS
```bash
bash ./install-postgresql/5_install-postgres.sh;
```

## vi. Creating a database call 'test' using PostgreSQL on your mac OS
```bash
bash ./install-postgresql/6_createdb-test.sh;
```

# 6. Start re-creating database & tables necessary for starting up this Node app

## i. Start by re-creating database
```bash
bash ./database-recreation/0_create_database_smart-brain.sh;
```

## ii. Re-creating a table called 'users' in our database using Bash
```bash
bash ./database-recreation/1_create_table-users.sh;
```
## or you may run SQL statements declared in 2_create_table-users.sql
```bash
2_create_table-users.sql
```

## iii. Re-creating a table called 'login' in our database for storing bcrypt password hashes
```bash
bash ./database-recreation/4_create_table-login.sh;
```
## or you may run SQL statements declared in 3_create_table-login.sql
```bash
2_create_table-login.sql
```

## iv. Verify that we've successfully created a table named 'users' in our database
```bash
bash ./database-recreation/5_verify_schema-users.sh;
```
## Hit 'q' key to exit when we're done verifying

## v. Verify that we've successfully created a table named 'login' in our database
```bash
bash ./database-recreation/6_verify_schema-login.sh;
```
## Hit 'q' key to exit when we're done verifying
