'use strict'

const AWS = require('aws-sdk')
const s3 = new AWS.S3()
const Joi = require('@hapi/joi')
const isUndefined = require('lodash/fp/isUndefined')
const { uuid } = require('uuidv4')
const { error400, error422, success200 } = require('../../helpers/response')

const schema = Joi.object({
	contentType: Joi.string().required(),
	fileType: Joi.string().required(),
})

/**
 * Use AWS SDK to create pre-signed POST data.
 * We also put a file size limit (100B - 10MB).
 * @param key
 * @param contentType
 * @returns {Promise<object>}
 */
const createPresignedPost = ({ key, contentType }) => {
	console.log(key, contentType)
	const params = {
		Expires: 60, // 1 minute
		Bucket: process.env.S3_BUCKET_NAME,
		Conditions: [['content-length-range', 100, 10000000]], // 100Byte - 10MB
		Fields: {
			'Content-Type': contentType,
			key,
		},
	}

	return new Promise(async (resolve, reject) => {
		s3.createPresignedPost(params, (err, data) => {
			if (err) {
				reject(err)
				return
			}
			resolve(data)
		})
	})
}

module.exports.presignedPost = async event => {
	const body = JSON.parse(event.body)
	const validation = schema.validate(body)
	if (!isUndefined(validation.error)) {
		return error422(validation.error.details)
	}
	const contentType = body.contentType
	const fileType = body.fileType
	try {
		const presignedPostData = await createPresignedPost({
			key: `${uuid()}.${fileType}`,
			contentType,
		})
		return success200(presignedPostData)
	} catch (e) {
		return error400(`Failed: ${error.message}`)
	}
}
