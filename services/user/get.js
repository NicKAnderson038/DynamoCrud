'use strict'

const Joi = require('@hapi/joi')
const { db } = require('../../helpers/dynamodb-client')
const { getTable } = require('../../helpers/schemaTable')
const { error400, error422, success200 } = require('../../helpers/response')

const schema = Joi.object({
	id: Joi.string().min(36).max(36).required(),
})

module.exports.get = async event => {
	const validation = schema.validate(event.pathParameters)
	if (!!validation.error) {
		return error422(validation.error.details)
	}

	const params = getTable(process.env.USER_INFO_DB, event.pathParameters)

	try {
		const result = await db('get', params)
		return success200(result.Item)
	} catch (error) {
		return error400(`Get user failed: ${error.stack}`)
	}
}
