import { put, takeEvery, call, all } from 'redux-saga/effects';

// Import Actions
import {
    getSearches as getSearchAction,
    getSearchesFailed,
    getSearchesSucceed,
    getSearchSucceed,
    getSearchFailed
} from './searchActions';

// Import API
import * as searchApi from './searchApi';

export function* searchSubscriber() {
    yield all([takeEvery('GET_SEARCHES', getSearches)]);
    yield all([takeEvery('GET_SEARCH', getSearch)]);
}

export function* getSearches({ payload: { params } }) {
    try {
        const searches = yield call(searchApi.getSearches, params);
        yield put(getSearchesSucceed(searches));
    } catch (error) {
        console.error(error);
        yield put(getSearchesFailed(error));
    }
}

export function* getSearch({ payload: { id } }) {
    try {
        const search = yield call(searchApi.getSearch, id);
        yield put(getSearchSucceed(search));
    } catch (error) {
        console.error(error);
        yield put(getSearchFailed(error));
    }
}