import boto3

s3 = boto3.resource('s3')

print(s3.buckets.all())

for myBucket in s3.buckets.all():
    print(myBucket)