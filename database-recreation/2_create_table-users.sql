CREATE TABLE users (
	id serial PRIMARY KEY,
	name varchar(100),
	email text UNIQUE NOT NULL,
	entries bigint DEFAULT 0,
	joined timestamp NOT NULL,
	raw_hex text
);