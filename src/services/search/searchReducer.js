import { handleActions } from 'redux-actions';

import {
    getSearches,getSearchesFailed,getSearchesSucceed,
    getSearch,getSearchFailed,getSearchSucceed
} from './searchActions';

const defaultState = {
    searches: null,
    error: null,
    loading: false,
    message: '',
    success: false,
    currentSearch: null
};

const reducer = handleActions({
    [getSearches](state) {
        return {
            ...state,
            error: null,
            loading: true,
            message: 'Generating seraches lists...'
        }
    },
    [getSearchesFailed](state, { payload: { error } }) {
        return {
            ...state,
            error,
            loading: false
        }
    },
    [getSearchesSucceed](state, { payload: { searches } }) {
        return {
            ...state,
            loading: false,
            searches
        }
    },
    [getSearch](state) {
        return {
            ...state,
            loading: true,
            success: false,
            message: 'Getting searach data info...',
            error: null
        }
    },
    [getSearchSucceed](state, { payload: { search } }) {
        return {
            ...state,
            loading: false,
            message: '',
            currentSearch: search
        }
    },
    [getSearchFailed](state, { payload: { error } }) {
        return {
            ...state,
            loading: false,
            success: false,
            message: 'Getting searach data info failed',
            error,
            currentSearch: null
        }
    },
}, defaultState);

export default reducer;