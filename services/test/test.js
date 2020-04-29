'use strict'

const randomBytes = require('crypto').randomBytes

function getDomainName(hostName) {
	return hostName.split('.')[0].replace('https://', '')
}

module.exports.test = async event => {
	return {
		statusCode: 200,
		body: JSON.stringify(
			{
				message: 'successfully!',
				// input: event,
				host: getDomainName(event.headers.Host),
				db: process.env.USER_INFO_DB,
				uuid: randomBytes(16).toString('hex'),
			},
			null,
			2
		),
	}
}
