'use strict'

const Joi = require('@hapi/joi')
const { db } = require('../../helpers/dynamodb-client')
const isUndefined = require('lodash/fp/isUndefined')
const { error400, error422, success200 } = require('../../helpers/response')

const schema = Joi.object({
	id: Joi.string().min(36).max(36).required(),
})

module.exports.get = async event => {
	const validation = schema.validate(event.pathParameters)
	if (!isUndefined(validation.error)) {
		return error422(validation.error.details)
	}

	const getUser = {
		TableName: process.env.USER_INFO_DB,
		Key: {
			id: event.pathParameters.id,
			// id: event.queryStringParameters.id,
		},
	}

	try {
		const result = await db('get', getUser)
		return success200(result.Item)
	} catch (error) {
		return error400(`Get user failed: ${error.stack}`)
	}
}
