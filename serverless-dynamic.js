const fs = require('fs')
const path = require('path')
const YAML = require('yamljs')

const readFile = (files, ymlFilePath) =>
	files
		.reduce((acc, dir) => {
			if (!dir.includes('.yml')) {
				const innerFile = fs.readdirSync(`${ymlFilePath}/${dir}`)
				const formatted = innerFile.map(f => `${dir}/${f}`)
				acc.push(formatted)
				return acc
			}
			acc.push(dir)
			return acc
		}, [])
		.flat()

const readYmlFilesFromPath = (ymlFilePath, ymlName) => {
	const files = readFile(fs.readdirSync(ymlFilePath), ymlFilePath)
	console.log(`${ymlName}.yml 📁:`, files)
	const merged = files
		.map(file => fs.readFileSync(path.join(ymlFilePath, file), 'utf8'))
		.map(raw => YAML.parse(raw))
		.reduce((result, handler) => ({ ...result, ...handler }))
	return merged
}

module.exports = {
	resources: () =>
		readYmlFilesFromPath('./serverless-yml/resources', 'resources'),
	functions: () =>
		readYmlFilesFromPath('./serverless-yml/functions', 'functions'),
}
