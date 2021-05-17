const { GeneralError,ApiError } = require('../helpers/error');

const handleErrors = (err, req, res, next) => {
    if(err instanceof ApiError && err.data){
        return res.status(err.getCode()).json({
            status: 'error',
            data: err.data,
            message: err.message
        });
    }
    if (err instanceof GeneralError) {

        return res.status(err.getCode()).json({
            status: 'error',
            message: err.message
        });
    }
    console.log(err)
    return res.status(500).json({
        status: 'error',
        message: err.message
    });
}


module.exports = handleErrors;
