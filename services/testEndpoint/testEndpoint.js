'use strict'

module.exports.testEndpoint = async event => {
  console.log(process.env.USER_INFO_DB)
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'successfully!',
        input: event,
      },
      null,
      2
    ),
  }
}
