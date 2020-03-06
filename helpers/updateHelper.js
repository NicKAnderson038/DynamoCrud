const updateExpression = require('dynamodb-update-expression')

module.exports = (body, original, TableName) => {
  return {
    TableName,
    Key: {
      id: body.id,
    },
    ...updateExpression.getUpdateExpression(original, body),
    // ReturnValues: 'UPDATED_NEW',
  }
}
