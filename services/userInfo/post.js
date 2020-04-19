'use strict'

const Joi = require('@hapi/joi')
const { uuid } = require('uuidv4')
const isUndefined = require('lodash/fp/isUndefined')
const { db } = require('../../helpers/dynamodb-client')
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
	if (!isUndefined(validation.error)) {
		return error422(validation.error.details)
	}
	const timestamp = new Date().getTime()

	const putUser = {
		TableName: process.env.USER_INFO_DB,
		Item: {
			...body,
			id: uuid(),
			createdAt: timestamp,
			updatedAt: timestamp,
		},
	}

	try {
		await db('put', putUser)
		return success200()
	} catch (error) {
		return error400(`Post user info failed: ${error.stack}`)
	}
}
