const AWS = require('aws-sdk')
const dynamoDb = new AWS.DynamoDB.DocumentClient()
const S3 = new AWS.S3()

const getSignedUrl = async (Key, Bucket) => {
	return await new Promise((resolve, reject) => {
		const paramsSignedUrl = {
			Bucket,
			Key,
			Expires: 300, // 5 minute
		}
		S3.getSignedUrl('getObject', paramsSignedUrl, (err, url) => {
			if (err) reject(err)
			resolve(url)
		})
	})
}

const s3 = (action, params) => S3[action](params).promise()

const db = (action, params) => dynamoDb[action](params).promise()

module.exports = {
	db,
	s3,
	getSignedUrl,
}
