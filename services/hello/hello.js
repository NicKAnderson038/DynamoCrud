'use strict'

module.exports.hello = async event => {
  console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++')
  console.log(process.env.USER_INFO_DB)
  console.log('===================================================')
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
