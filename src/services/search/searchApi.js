import { wrapRequest, xapi } from '../utils';

const getSearches = wrapRequest(async params =>
    xapi().get(`/api/restaurants?city=${params.city}&address=${params.address}&area=${params.area}&page=${params.page}`)

);
const getSearch = wrapRequest(async id =>
    xapi().get(`/api/restaurants/${id}`)
);
export {
    getSearches,
    getSearch
};
