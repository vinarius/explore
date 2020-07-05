from flask import Flask
from flask_cors import CORS, cross_origin
import boto3
from flask import jsonify
import json


app = Flask(__name__)
cors = CORS(app)
myPyTestTable = boto3.resource('dynamodb').Table('myPyTest')


# return jsonify(temperatureC=temperature,
#                 humidity=humidity,
#                 temperatureF= (temperature*9/5) + 32   
#             )

@app.route('/')
def index():
    return 'home page'

@app.route('/create')
def create_user():
    return 'create user page'

@app.route('/read')
def get_user():

    user = myPyTestTable.get_item(
        Key={
            'id': '8034fd9a-bf00-11ea-bbde-6045cb6ef200'
        }
    )

    print(user)

    return json.dumps(user['Item'])

@app.route('/update')
def update_user():
    return 'update user page'

@app.route('/delete')
def delete_user():
    return 'delete user page'
