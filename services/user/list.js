'use strict'

const { db } = require('../../helpers/dynamo-client')
const { error400, success200 } = require('../../helpers/response')

module.exports.list = async () => {
	const params = {
		TableName: process.env.USER_INFO_DB,
	}

	try {
		const result = await db('scan', params)
		return success200(result.Items)
	} catch (error) {
		return error400(`Get list of users failed: ${error.stack}`)
	}
}
