/**
 * Created by yosbel on 18/12/18.
 */
import ax from 'axios'

const axios = ax.create({
    timeout: 0,
    baseURL: 'http://localhost:5900/api/',
    headers: {
        'Content-Type': 'application/json'
    }

});

const errorHandler = (error) => {
    const {response} = error
    if (response && response.status == false) {
        return Promise.reject(response)
    }

    return Promise.reject(response)
}

const successHandler = (response) => {
    if (response) {
        return response.data;
    }

    return '401';
}

axios.interceptors.response.use(
    response => successHandler(response),
    request => errorHandler(request),
    error => errorHandler(error)
)


export default axios
