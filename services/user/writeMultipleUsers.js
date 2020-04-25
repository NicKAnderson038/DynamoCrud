'use strict'

const { db } = require('../../helpers/dynamo-client')
const { putTable } = require('../../helpers/schemaModal')
const { error400, success200 } = require('../../helpers/response')

module.exports.writeMultipleUsers = async event => {
	const body = Array.from(Array(101).keys())
	body.shift()

	try {
		for await (let record of body) {
			const params = await putTable(process.env.USER_INFO_DB, {
				firstName: 'Jean-Luc',
				lastName: 'Picard',
				userInfo: 'Engage!',
				age: record,
			})
			await db('put', params)
		}
		return success200()
	} catch (error) {
		return error400(`Post user info failed: ${error.stack}`)
	}
}
