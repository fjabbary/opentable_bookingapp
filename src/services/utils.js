import axios from 'axios';

// Import Settings
import settings from '../config/settings.js';
import store from '../store';

// Import Logout action
import queryString from 'query-string';

export const wrapRequest = func => {
    return async (...args) => {
        const res = await func(...args);
        if (
            res &&
            res.status &&
            res.status !== 200 &&
            res.status !== 201 &&
            res.status !== 204
        ) {
            throw res;
        } else {
            // console.log(res)
            return res.data;
        }
    };
};

export const xapi = () => {
    let headers = {
        'X-Requested-With': 'XMLHttpRequest',
        Accept: 'application/json',
        charset: 'UTF-8'
    };
    let xapi = axios.create({
        baseURL: settings.BASE_URL,
        // headers: headers,
    });

    return xapi;
};

export const errorMsg = error => {
    let errorMsg = {
        title: null,
        message: ''
    };

    if (typeof error === 'object' && error !== null) {
        if (error.data && error.data.message) {
            errorMsg.title = error.data.message;
            let errors = error.data.errors;
            if (errors) {
                for (let key in errors) {
                    /* eslint-disable-next-line  */
                    if (errors[key]) {
                        /* eslint-disable-next-line  */
                        errors[key].map(msg => {
                            errorMsg.message += msg + '\n';
                        });
                    }
                }
            }
        }
    } else {
        errorMsg.title = error;
    }

    return errorMsg;
};



export const updateSearchQueryInUrl = instance => {
    let values = queryString.parse(instance.props.location.search);
    values = {
        ...values,
        ...instance.filter
    };
    const searchQuery = queryString.stringify(values);
    instance.props.history.push({
        pathname: instance.props.location.pathname,
        search: `?${searchQuery}`
    });
};
