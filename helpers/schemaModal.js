const { uuid } = require('uuidv4')
const updateExpression = require('dynamodb-update-expression')

const putTable = (TableName, body) => {
	const timestamp = new Date().getTime()
	return {
		TableName,
		Item: {
			...body,
			id: uuid(),
			createdAt: timestamp,
			updatedAt: timestamp,
		},
	}
}

const updateTable = (TableName, body, original) => {
	body.updatedAt = new Date().getTime()
	return {
		TableName,
		Key: {
			id: body.id,
		},
		...updateExpression.getUpdateExpression(original, body),
		// ReturnValues: 'UPDATED_NEW',
	}
}

const getTable = (TableName, body) => {
	return {
		TableName,
		Key: {
			id: body.id,
		},
	}
}

const deleteTable = (TableName, body) => {
	return {
		TableName,
		Key: {
			...body,
		},
	}
}

module.exports = {
	putTable,
	updateTable,
	getTable,
	deleteTable,
}
