'use strict'

const Joi = require('@hapi/joi')
const isUndefined = require('lodash/fp/isUndefined')
const { db } = require('../../helpers/dynamodb-client')
const { error400, error422, success200 } = require('../../helpers/response')
const updateHelper = require('../../helpers/updateHelper')

const schema = Joi.object({
  id: Joi.string().min(36).max(36).required(),
  firstName: Joi.string(),
  lastName: Joi.string(),
  userInfo: Joi.string(),
  age: Joi.number().integer().min(1).max(150),
  createdAt: Joi.number().integer(),
  updatedAt: Joi.number().integer(),
})

module.exports.update = async event => {
  const body = JSON.parse(event.body)
  const validation = schema.validate(body)
  if (!isUndefined(validation.error)) {
    return error422(validation.error.details)
  }
  body.updatedAt = new Date().getTime()

  const getUser = {
    TableName: process.env.USER_INFO_DB,
    Key: {
      id: body.id,
    },
  }

  try {
    const original = await db('get', getUser)
    const expressionResult = updateHelper(
      body,
      original.Item,
      process.env.USER_INFO_DB
    )
    const result = await db('update', expressionResult)
    return success200(result.Attributes)
  } catch (error) {
    return error400(`Could not update user: ${error.stack}`)
  }
}
