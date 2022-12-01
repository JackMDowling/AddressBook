import os
import psycopg2

conn = psycopg2.connect(
              host="db",
              database="docker-postgres",
              user="main",
              password="password")

# Open a cursor to perform database operations
cur = conn.cursor()

# Execute a command: this creates a new table

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