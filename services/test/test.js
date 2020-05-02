'use strict'

const randomBytes = require('crypto').randomBytes

function getDomainName(hostName) {
	const host = hostName.split('.')[0].replace('https://', '')
	const removePort = h => h.slice(0, h.indexOf(':'))
	return !!(host.indexOf(':') + 1) ? removePort(host) : host
}

module.exports.test = async event => {
	return {
		statusCode: 200,
		body: JSON.stringify(
			{
				message: 'successfully!',
				// input: event.headers,
				host: getDomainName(event.headers.Host),
				db: process.env.USER_INFO_DB,
				uuid: randomBytes(16).toString('hex'),
			},
			null,
			2
		),
	}
}
