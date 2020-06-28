import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

/** Import service reducers */
import searchReducer from './search/searchReducer';


const servicesReducer = combineReducers({
    search: searchReducer
});

export default combineReducers({
    routing: routerReducer,
    services: servicesReducer
});
