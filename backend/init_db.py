import os
import psycopg2

conn = psycopg2.connect(
        host="localhost",
        database="address",
        user=os.environ['DB_USERNAME'],
        password=os.environ['DB_PASSWORD'])

# Open a cursor to perform database operations
cur = conn.cursor()

# Execute a command: this creates a new table
cur.execute('DROP TABLE IF EXISTS addresses;')
cur.execute('CREATE TABLE addresses (id serial PRIMARY KEY,'
                                 'first_name varchar (50) NOT NULL,'
                                 'last_name varchar (50) NOT NULL,'
                                 'address varchar (50) NOT NULL,'
                                 'city varchar (50) NOT NULL,'
                                 'state varchar (2) NOT NULL,'
                                 'zip integer NOT NULL);'
                                 )


conn.commit()

cur.close()
conn.close()