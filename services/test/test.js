'use strict'

module.exports.test = async event => {
	return {
		statusCode: 200,
		body: JSON.stringify(
			{
				message: 'successfully!',
				input: event,
				db: process.env.USER_INFO_DB,
			},
			null,
			2
		),
	}
}
