# Serverless Micro services CRUD application with DynamoDB

### Setup

1. Create an account with AWS.
2. Install aws_access_key_id & aws_secret_access_key with the aws-cli or use a vscode extenstion <a href="https://marketplace.visualstudio.com/items?itemName=mark-tucker.aws-cli-configure" target="_blank">AWS CLI config</a> to manage keys.

<br>

#

### Npm or Yarn Build Steps

<ul>

#### NPM

1. Replace text `yarn` with `npm` in package.json scripts.
2. Install serverless globally: `npm install -g serverless`
3. Run: `npm install`
4. Run: `npm run build` to deploy lambda micro services.

#### YARN

1. Install yarn for building application locally (couple ways).
   <ul>
   <li>Download: <a href="https://yarnpkg.com/" target="_blank">Install Yarn</a> </li>
   <li>HomeBrew: brew install yarn</li>
   </ul>
2. Install serverless globally: `yarn add global serverless`
3. Run: `yarn`
4. Run: `yarn build` to deploy lambda micro services.

</ul>

<br>

#

### Api Endpoints

Building process will generate api-gateway endpoints in the console. Using postman, test with the `https://**/test-endpoint` microservice endpoint to confirm connection.

<br>

#

### Testing uploading files to S3 (pick between 2 or 3)

1. After running the build. Copy/paste the api-gateway url `https://**/presigned-post` into the client/index.html file.

2. Modify s3Bucket.yml is set to auto generate a bucket Name. Once generated assign it to `S3_BUCKET_NAME` in the environment.yml file.

3. Modify s3Bucket.yml to pre-define a bucket name. Then assign it to `S3_BUCKET_NAME` in the environment.yml file.

<br>

#

### Removing apis (built with npm or yarn)

`npm run remove`

##### or

`yarn remove`

<br>
<br>

<img src="https://devclass.com/wp-content/uploads/2018/07/Serverless.jpg" width="400">
