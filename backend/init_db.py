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

# Insert data into the table

cur.execute('INSERT INTO addresses (first_name, last_name, address, city, state, zip)'
            'VALUES (%s, %s, %s, %s, %s, %s)',
            ('William',
             'Faulkner',
             '1234 Trinity Ave.',
             'New Albany',
             'MI',
             38628)
            )

cur.execute('INSERT INTO addresses (first_name, last_name, address, city, state, zip)'
            'VALUES (%s, %s, %s, %s, %s, %s)',
            ('Anne',
             'Rice',
             '1234 Dracula Lane',
             'New Orleans',
             'LA',
             70726)
            )


conn.commit()

cur.close()
conn.close()