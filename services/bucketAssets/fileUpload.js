'use strict'
/**
 * Down load images directly into S3
 */
const { s3 } = require('../../helpers/aws-client')
const fetch = require('node-fetch')
const { uuid } = require('uuidv4')
const { error400, success200 } = require('../../helpers/response')

module.exports.fileUpload = async () => {
	try {
		const result = await fetch(
			'https://steamcdn-a.akamaihd.net/steam/apps/742300/header.jpg?t=1581580402'
		)
			.then(response => response.buffer())
			.then(
				buffer =>
					s3('putObject', {
						Bucket: process.env.S3_BUCKET_NAME,
						Key: `${uuid()}.jpg`,
						Body: buffer,
					})
				// s3
				// 	.putObject({
				// 		Bucket: process.env.S3_BUCKET_NAME,
				// 		Key: `${uuid()}.jpg`,
				// 		Body: buffer,
				// 	})
				// 	.promise()
			)
		return success200(result)
	} catch (error) {
		return error400(`Upload web image failed: ${error.stack}`)
	}
}
