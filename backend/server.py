import os
import psycopg2
from psycopg2.pool import ThreadedConnectionPool
import psycopg2.extras
import requests
from flask import Flask, request
from operator import itemgetter
import xml.etree.ElementTree as ET
from decouple import config

app = Flask(__name__)
pool = None

def get_db_connection():
  global pool

  if not pool:
    pool = ThreadedConnectionPool(2, 5, host='localhost',
                                  database='address',
                                  user=os.environ.get('PG_USERNAME'),
                                  password=os.environ.get('PG_PASSWORD'))

  return pool.getconn()

# When you are done with the connection, return it to the pool
def release_db_connection(conn):
  global pool
  pool.putconn(conn)

@app.route('/')
def home():
    return 'Homepage'

## Initital select all for DB

@app.route('/list')
def index():
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory = psycopg2.extras.RealDictCursor)
    cur.execute('SELECT * FROM addresses ORDER BY id ASC;')
    addresses = cur.fetchall()
    cur.close()
    release_db_connection(conn)
    return addresses

@app.route('/addUser', methods=['GET', 'POST'])
def addUser():
    if request.method == 'POST':
      USPS_ID = os.environ.get('USPS_ID')
      firstName, lastName, address, zipcode = itemgetter('firstName', 'lastName', 'address', 'zipcode')(request.json)

      # Build xml to use with API

      root = ET.Element('CityStateLookupRequest')
      root.set('USERID', USPS_ID)
      zipCode = ET.SubElement(root, 'ZipCode')
      zipCode.set('ID', '0')
      zip5 = ET.SubElement(zipCode, 'Zip5')
      zip5.text = zipcode
      xml_string = ET.tostring(root).decode()
      
      USPS_URL = f'https://production.shippingapis.com/ShippingAPI.dll?API= CityStateLookup&XML={xml_string}'
      response = requests.post(url = USPS_URL)
      root = ET.fromstring(response.content)
      if root[0][0].tag == 'Error':
        return 'Request Failed', 400
      city = root[0][1].text.title()
      state = root[0][2].text
      conn = get_db_connection()
      cur = conn.cursor()
      cur.execute('INSERT INTO addresses (first_name, last_name, address, city, state, zip)'
            'VALUES (%s, %s, %s, %s, %s, %s)',
            (firstName, lastName, address, city, state, zipcode))
      conn.commit()
      cur.close()
      release_db_connection(conn)
    return 'Success'


@app.route('/deleteEntry', methods=['POST'])
def deleteEntry():
  req_body = request.json
  id = req_body['id']
  conn = get_db_connection()
  cur = conn.cursor()
  cur.execute('DELETE FROM addresses WHERE id = %s;',
            [id])
  conn.commit()
  cur.close()
  release_db_connection(conn)
  return 'Successfully Deleted'

@app.route('/editEntry', methods=['POST'])
def editEntry():
    req_body = request.json
    firstName, lastName, address, zipcode, city, state, id = itemgetter('firstName', 'lastName', 'address', 'zipcode', 'city', 'state', 'id')(req_body)
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('UPDATE addresses SET first_name = %s, last_name =%s, address =%s, city =%s, state =%s, zip =%s WHERE id = %s;',
            (firstName, lastName, address, city, state, zipcode, id))
    conn.commit()
    cur.close()
    release_db_connection(conn)
    return 'Successfully Updated'

if __name__ == '__main__':
    app.run(debug=True)
