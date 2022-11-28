import os
import psycopg2
import psycopg2.extras
from flask import Flask

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

if __name__ == '__main__':
    app.run(debug=True)
