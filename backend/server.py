from flask import Flask
import datetime
  
timeNow = datetime.datetime.now()

app = Flask(__name__)

@app.route('/')
def home():
    return 'Homepage'

@app.route('/data')
def get_time():
    return {
        'Name':"Jack", 
        "Age":"33",
        "Date":timeNow, 
        "programming":"python and react!"
        }

if __name__ == '__main__':
    app.run(debug=True)
