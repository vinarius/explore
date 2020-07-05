import boto3
import uuid

ddb = boto3.resource('dynamodb')

myPyTestTable = ddb.Table('myPyTest')

# myPyTestTable.put_item(
#     Item={
#         'username': 'vin',
#         'first_name': 'Mark',
#         'last_name': 'Kraus',
#         'age': 29,
#         'account_type': 'admin',
#         'id': str(uuid.uuid1())
#     }
# )

myPyTestTable.delete_item(
    Key={
        'id': '6fd8d6a6-bf00-11ea-b27f-6045cb6ef200'
    }
)