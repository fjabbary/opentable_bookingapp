import { wrapRequest, xapi } from '../utils';

const getSearches = wrapRequest(async params =>
    xapi().get(`/api/restaurants?city=${params.city.trim()}&address=${params.address.trim()}&area=${params.area.trim()}&page=${params.page}`)

);
const getSearch = wrapRequest(async id =>
    xapi().get(`/api/restaurants/${id}`)
);
export {
    getSearches,
    getSearch
};
