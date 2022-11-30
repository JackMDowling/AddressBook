import os
import psycopg2
import psycopg2.extras
import requests
from flask import Flask, request
from operator import itemgetter
import xml.etree.ElementTree as ET

app = Flask(__name__)


def get_db_connection():
    conn = psycopg2.connect(host='localhost',
                            database='address',
                            user=os.environ['DB_USERNAME'],
                            password=os.environ['DB_PASSWORD'])
    return conn

@app.route('/')
def home():
    return 'Homepage'

## Initital select all for DB

@app.route('/list')
def index():
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory = psycopg2.extras.RealDictCursor)
    cur.execute('SELECT * FROM addresses;')
    addresses = cur.fetchall()
    print(addresses)
    cur.close()
    conn.close()
    return addresses

@app.route('/addUser', methods=['GET', 'POST'])
def addUser():
    if request.method == 'POST':
    #   USPS_ID = os.environ.get("USPS_ID")
    # To Do put in env
      USPS_ID = '472NA0000197'
      req_body = request.json
      firstName, lastName, address, zipcode = itemgetter('firstName', 'lastName', 'address', 'zipcode')(req_body)
      xmlString = f'<CityStateLookupRequest USERID=\'{USPS_ID}\'><ZipCode ID=\"0\"><Zip5>{zipcode}</Zip5></ZipCode></CityStateLookupRequest>'
      USPS_URL = f'https://production.shippingapis.com/ShippingAPI.dll?API= CityStateLookup&XML={xmlString}'
      response = requests.post(url = USPS_URL)
      root = ET.fromstring(response.content)
      city = root[0][1].text
      state = root[0][2].text
      conn = get_db_connection()
      cur = conn.cursor()
      cur.execute('INSERT INTO addresses (first_name, last_name, address, city, state, zip)'
            'VALUES (%s, %s, %s, %s, %s, %s)',
            (firstName, lastName, address, city, state, zipcode))
      conn.commit()
      cur.close()
      conn.close()
    return 'Success'


@app.route('/deleteEntry', methods=['POST'])
def deleteEntry():
  req_body = request.json
  print(req_body['id'])
  id = req_body['id']
  conn = get_db_connection()
  cur = conn.cursor()
  cur.execute('DELETE FROM addresses WHERE id = %s;',
            [id])
  conn.commit()
  cur.close()
  conn.close()

  return 'Successfully Deleted'


if __name__ == '__main__':
    app.run(debug=True)
