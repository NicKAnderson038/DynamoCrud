const { uuid } = require('uuidv4')

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
	getTable,
	deleteTable,
}
