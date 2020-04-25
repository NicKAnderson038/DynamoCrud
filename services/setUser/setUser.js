'use strict'

/*
 * Unlike the `userInfo` microservices, this service supports multiple methods.
 * Post, Put and Delete
 * PERSPECTIVE: this makes services overly complicated. Microservices are a much more flexable and maintainable pattern.
 * POSITIVES: the schemaModal.js file is an improvement. Mircoservices can benefit from those.
 */

const Joi = require('@hapi/joi')
const { db } = require('../../helpers/dynamo-client')
const { validate, isObjEmpty } = require('../../helpers/request-validation')
const { updateTable } = require('../../helpers/schemaModal')
const { error400, error422, success200 } = require('../../helpers/response')

const postSchema = Joi.object({
	firstName: Joi.string().required(),
	lastName: Joi.string().required(),
	userInfo: Joi.string().required(),
	age: Joi.number().integer().min(1).max(150).required(),
})

const deleteSchema = Joi.object({
	id: Joi.string().min(36).max(36).required(),
})

const updateSchema = Joi.object({
	id: Joi.string().min(36).max(36).required(),
	firstName: Joi.string(),
	lastName: Joi.string(),
	userInfo: Joi.string(),
	age: Joi.number().integer().min(1).max(150),
	createdAt: Joi.number().integer(),
	updatedAt: Joi.number().integer(),
})

module.exports.setUser = async event => {
	const body = JSON.parse(event.body)
	const schema = validate(
		event.httpMethod,
		{ postSchema, deleteSchema, updateSchema },
		process.env.USER_INFO_DB,
		body
	)

	if (!!schema.joi.error) {
		return error422(schema.joi.error.details)
	}

	try {
		const result = await db(schema.method, schema.params)
		if (event.httpMethod === 'PUT') {
			const expressionResult = updateTable(
				process.env.USER_INFO_DB,
				body,
				result.Item
			)
			const updateResult = await db('update', expressionResult)
			return success200(updateResult.Attributes)
		} else if (event.httpMethod === 'DELETE') {
			if (isObjEmpty(result)) return success200('Deleted successful')
			throw { stack: 'Invalid hash id' }
		}
		return success200('Post successful')
	} catch (error) {
		return error400(`Failed user request: ${error.stack}`)
	}
}
