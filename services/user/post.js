'use strict'

const Joi = require('@hapi/joi')
const { db } = require('../../helpers/dynamo-client')
const { putTable } = require('../../helpers/schemaModal')
const { error400, error422, success200 } = require('../../helpers/response')

const schema = Joi.object({
	firstName: Joi.string().required(),
	lastName: Joi.string().required(),
	userInfo: Joi.string().required(),
	age: Joi.number().integer().min(1).max(150).required(),
})

module.exports.post = async event => {
	const body = JSON.parse(event.body)
	const validation = schema.validate(body)

	if (!!validation.error) {
		return error422(validation.error.details)
	}

	const params = putTable(process.env.USER_INFO_DB, body)

	try {
		await db('put', params)
		return success200()
	} catch (error) {
		return error400(`Post user info failed: ${error.stack}`)
	}
}
