const headers = require('./headers')

module.exports.error400 = (errorMessage = 'unknown error') => {
    return {
        statusCode: 400,
        body: JSON.stringify({
            error: errorMessage,
        }),
    }
}

module.exports.error422 = error => {
    return {
        statusCode: 422,
        body: JSON.stringify({
            error,
        }),
    }
}

module.exports.success200 = (successMessage = 'success') => {
    return {
        headers,
        statusCode: 200,
        body: JSON.stringify({
            data: successMessage,
        }),
    }
}
