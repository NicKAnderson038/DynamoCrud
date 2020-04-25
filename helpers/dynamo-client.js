const AWS = require('aws-sdk')
const dynamoDb = new AWS.DynamoDB.DocumentClient()

const db = (action, params) => dynamoDb[action](params).promise()

module.exports = {
	db,
}
