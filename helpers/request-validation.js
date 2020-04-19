const { putTable, getTable, deleteTable } = require('./schemaTable')

const emptyStringCheck = data =>
	!!Object.values(data)
		.filter(d => typeof d === 'string')
		.filter(d => d.length === 0).length

const isObjEmpty = obj => {
	for (const key in obj) {
		if (obj.hasOwnProperty(key)) return false
	}
	return true
}

const validate = (httpMethod, schema, table, body) => {
	switch (httpMethod) {
		case 'POST': // put_DB
			return {
				joi: schema.postSchema.validate(body),
				params: putTable(table, body),
				method: 'put',
			}
		case 'PUT': // update_DB (get table before updating)
			return {
				joi: schema.updateSchema.validate(body),
				params: getTable(table, body),
				method: 'get',
			}
		case 'DELETE':
			return {
				joi: schema.deleteSchema.validate(body),
				params: deleteTable(table, body),
				method: 'delete',
			}
		default:
			return { error: 'Invalid HttpMethod' }
	}
}

module.exports = {
	emptyStringCheck,
	isObjEmpty,
	validate,
}
