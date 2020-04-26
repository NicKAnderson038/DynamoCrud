'use strict'

const randomBytes = require('crypto').randomBytes

module.exports.test = async event => {
	return {
		statusCode: 200,
		body: JSON.stringify(
			{
				message: 'successfully!',
				// input: event,
				db: process.env.USER_INFO_DB,
				uuid: randomBytes(16).toString('hex'),
			},
			null,
			2
		),
	}
}
