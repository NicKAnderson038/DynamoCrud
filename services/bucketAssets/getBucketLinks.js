'use strict'

const { s3, getSignedUrl } = require('../../helpers/aws-client')
const { error400, success200 } = require('../../helpers/response')

module.exports.getBucketLinks = async () => {
	const params = {
		Bucket: process.env.S3_BUCKET_NAME,
	}

	try {
		const s3List = await s3('listObjectsV2', params)
		const s3Keys = s3List.Contents.reduce((acc, key) => {
			if (key.Key.match('.jpg|.png|.pdf|.csv|.gif|.txt')) {
				acc.push(key.Key)
			}
			return acc
		}, [])

		async function processSignatures(items) {
			const array = []
			for (const item of items) {
				const signedUrl = await getSignedUrl(item, process.env.S3_BUCKET_NAME)
				array.push(signedUrl)
			}
			return array
		}

		const array = await processSignatures(s3Keys)
		return success200(array)
	} catch (error) {
		return error400(`Failed returning signed file links: ${error.message}`)
	}
}
