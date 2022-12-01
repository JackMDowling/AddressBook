
GRANT ALL PRIVILEGES ON DATABASE docker-postgres TO main;

CREATE TABLE addresses (
  id serial PRIMARY KEY,
  first_name varchar (50) NOT NULL,
  last_name varchar (50) NOT NULL,
  address varchar (50) NOT NULL,
  city varchar (50) NOT NULL,
  state varchar (2) NOT NULL,
  zip integer NOT NULL);

