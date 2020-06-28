import { createActions } from 'redux-actions';

const {
    getSearches,
    getSearchesSucceed,
    getSearchesFailed,
    getSearch,
    getSearchSucceed,
    getSearchFailed,
} = createActions({
    GET_SEARCHES: params => ({ params }),
    GET_SEARCHES_SUCCEED: searches => ({ searches }),
    GET_SEARCHES_FAILED: error => ({ error }),
    GET_SEARCH: id => ({ id }),
    GET_SEARCH_SUCCEED: search => ({ search }),
    GET_SEARCH_FAILED: error => ({ error }),
});

export {
    getSearches,
    getSearchesSucceed,
    getSearchesFailed,
    getSearch,
    getSearchSucceed,
    getSearchFailed,
};
