'use strict'

const Joi = require('@hapi/joi')
const { db } = require('../../helpers/aws-client')
const { getTable, updateTable } = require('../../helpers/schemaTable')
const { error400, error422, success200 } = require('../../helpers/response')

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

	if (!!validation.error) {
		return error422(validation.error.details)
	}

	const params = getTable(process.env.USER_INFO_DB, body)

	try {
		const original = await db('get', params)
		const expressionResult = updateTable(
			process.env.USER_INFO_DB,
			body,
			original.Item
		)
		const result = await db('update', expressionResult)
		return success200(result.Attributes)
	} catch (error) {
		return error400(`Could not update user: ${error.stack}`)
	}
}
