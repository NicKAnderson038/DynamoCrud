'use strict'

module.exports.test = async event => {
  console.log(process.env.USER_INFO_DB)
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'successfully!',
        input: event,
      },
      null,
      2,
    ),
  }
}
