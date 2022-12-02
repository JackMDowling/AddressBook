import os
import psycopg2

conn = psycopg2.connect(
        host="localhost",
        database="address",
        user=os.environ['DB_USERNAME'],
        password=os.environ['DB_PASSWORD'])

# Open a cursor to perform database operations
cur = conn.cursor()

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