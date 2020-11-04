PROFILE=vf-team7
REGION=us-east-1
CLIENT=kraus
APPLICATION=helloWorld
ENVIRONMENT=dev
CONNECT_INSTANCE_ID=2c0e519a-a65c-455b-836b-dd2d3fa07b32 # kraus-dev
PACKAGING_BUCKET=kraus-packaging # required ahead of time

cd hello_world

pip install --target ../package -r requirements.txt

cd ..

# py zip-dependencies.py

sam.cmd deploy \
--stack-name "${CLIENT}-${APPLICATION}-${ENVIRONMENT}" \
--profile vf-team7 \
--s3-bucket "${PACKAGING_BUCKET}" \
--region "${REGION}" \
--capabilities CAPABILITY_IAM \
--parameter-overrides ConnectInstanceId="${CONNECT_INSTANCE_ID}"