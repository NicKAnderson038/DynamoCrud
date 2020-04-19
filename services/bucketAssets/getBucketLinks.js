'use strict'

const AWS = require('aws-sdk')
const s3 = new AWS.S3()
const { error400, success200 } = require('../../helpers/response')

module.exports.getBucketLinks = async () => {
	const params = {
		Bucket: process.env.S3_BUCKET_NAME,
	}

	try {
		const s3List = await s3.listObjectsV2(params).promise()
		const s3Keys = s3List.Contents.reduce((acc, key) => {
			if (key.Key.match('.jpg|.png|.pdf|.csv|.gif|.txt')) {
				acc.push(key.Key)
			}
			return acc
		}, [])

		const getSignedUrl = async Key => {
			return await new Promise((resolve, reject) => {
				const paramsSignedUrl = {
					Bucket: process.env.S3_BUCKET_NAME,
					Key,
					Expires: 300, // 5 minute
				}
				s3.getSignedUrl('getObject', paramsSignedUrl, (err, url) => {
					if (err) reject(err)
					resolve(url)
				})
			})
		}

		async function processSignatures(items) {
			const array = []
			for (const item of items) {
				const signedUrl = await getSignedUrl(item)
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
