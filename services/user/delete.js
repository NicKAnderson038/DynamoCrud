'use strict'

const Joi = require('@hapi/joi')
const { db } = require('../../helpers/aws-client')
const { isObjEmpty } = require('../../helpers/request-validation')
const { deleteTable } = require('../../helpers/schemaTable')
const { error400, error422, success200 } = require('../../helpers/response')

const schema = Joi.object({
	id: Joi.string().min(36).max(36).required(),
})

module.exports.delete = async event => {
	const body = JSON.parse(event.body)
	const validation = schema.validate(body)

	if (!!validation.error) {
		return error422(validation.error.details)
	}

	const params = deleteTable(process.env.USER_INFO_DB, body)

	try {
		const result = await db('delete', params)
		if (isObjEmpty(result)) {
			return success200('User Deleted Successfully')
		}
		throw { stack: 'Invalid hash id' }
	} catch (error) {
		return error400(`Could not delete user: ${error.stack}`)
	}
}
