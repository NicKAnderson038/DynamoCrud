'use strict'

const Joi = require('@hapi/joi')
const isUndefined = require('lodash/fp/isUndefined')
const { db } = require('../../helpers/dynamodb-client')
const { isObjEmpty } = require('../../helpers/request-validation')
const { error400, error422, success200 } = require('../../helpers/response')

const schema = Joi.object({
  id: Joi.string().min(36).max(36).required(),
})

module.exports.delete = async event => {
  const body = JSON.parse(event.body)
  const validation = schema.validate(body)
  if (!isUndefined(validation.error)) {
    return error422(validation.error.details)
  }

  const deleteUser = {
    TableName: process.env.USER_INFO_DB,
    Key: {
      ...body,
    },
  }

  try {
    const result = await db('delete', deleteUser)
    if (isObjEmpty(result)) {
      return success200('User Deleted Successfully')
    }
    throw { stack: 'Invalid hash id' }
  } catch (error) {
    return error400(`Could not delete user: ${error.stack}`)
  }
}
