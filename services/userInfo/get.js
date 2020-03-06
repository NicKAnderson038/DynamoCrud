'use strict'

const AWS = require('aws-sdk')
const dynamoDb = new AWS.DynamoDB.DocumentClient()
const Joi = require('@hapi/joi')
const isUndefined = require('lodash/fp/isUndefined')
const { error400, error422, success200 } = require('../../helpers/response')

const schema = Joi.object({
  id: Joi.string()
    .min(36)
    .max(36)
    .required(),
})

module.exports.get = async event => {
  const validation = schema.validate(event.queryStringParameters)
  if (!isUndefined(validation.error)) {
    return error422(validation.error.details)
  }

  const getUser = {
    TableName: process.env.USER_INFO_DB,
    Key: {
      id: event.queryStringParameters.id,
    },
  }

  try {
    const result = await dynamoDb.get(getUser).promise()
    return success200(result.Item)
  } catch (error) {
    return error400(`Get user failed: ${error.stack}`)
  }
}
