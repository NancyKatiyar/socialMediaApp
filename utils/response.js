module.exports = {
        successResponseData(res, data, message, extras, code = 200) {
        const response = {
            success: true,
            message: message,
            data,
        }
        if (extras) {
            Object.keys(extras).forEach((key) => {
                if ({}.hasOwnProperty.call(extras, key)) {
                    response[key] = extras[key]
                }
            })
        }
        return res.status(code).send(response)
    },

    successResponseWithoutData(res, message, code = 202) {
        const response = {
            success: true,
            message: message,
        }
        return res.status(code).send(response)
    },

    errorResponseWithoutData(res, message, code = 400) {
        const response = {
            success: false,
            message: message,
        }
        return res.status(code).send(response)
    },

    errorResponseData(res, message, data,code = 400) {
        const response = {
            success: false,
            data : data,
            message: message
        }
        return res.status(code).send(response)
    },
}