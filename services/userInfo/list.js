'use strict'

const { db } = require('../../helpers/dynamodb-client')
const { error400, success200 } = require('../../helpers/response')

module.exports.list = async () => {
  const scan = {
    TableName: process.env.USER_INFO_DB,
  }

  try {
    const result = await db('scan', scan)
    return success200(result.Items)
  } catch (error) {
    return error400(`Get list of users failed: ${error.stack}`)
  }
}
