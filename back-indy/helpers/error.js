class GeneralError extends Error {
    constructor(message) {
        super();
        this.message = message;
    }

    getCode() {
        if (this instanceof Unauthorized) {
            return 401;
        }if (this instanceof BadRequest) {
            return 400;
        } if (this instanceof NotFound) {
            return 404;
        }if (this instanceof ApiError) {
            return 400;
        }
        return 500;
    }
}

class BadRequest extends GeneralError { }
class NotFound extends GeneralError { }
class Unauthorized extends GeneralError { }
class ApiError extends GeneralError {
    constructor(message, data) {
        super();
        this.message = message;
        this.data = data;
    }

    getData(){
        return this.data;
    }

}

module.exports = {
    GeneralError,
    BadRequest,
    NotFound,
    ApiError,
    Unauthorized
};
