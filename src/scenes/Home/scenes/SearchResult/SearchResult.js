import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toastr } from 'react-redux-toastr';

import {
    getSearches, getSearch
} from '../../../../services/search/searchActions';
import { Pagination } from '@material-ui/lab';

class SearchResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            city: '',
            address: '',
            area: '',
            page: 1
        };
        this.change = this.change.bind(this);
        this.handleGetResult = this.handleGetResult.bind(this);

    }
    componentDidMount() {
        if (localStorage.getItem('params')) {
            const params = JSON.parse(localStorage.getItem('params'));
            this.props.searchActions.getSearches(params);
        }
    }
    change(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleGetResult() {
        const { city, address, area } = this.state;
        if (city === null || city === '') {
            toastr.error('City name is missing', 'You must provide city name');
            return;
        }
        const params = {
            city: city,
            address: address,
            area: area
        }
        localStorage.setItem('params', JSON.stringify(params))
        this.props.searchActions.getSearches(params);
        this.setState({
            city: '',
            address: '',
            area: ''
        });
    }

    onClickGetSearch = (id) => {
        const { history } = this.props;
        localStorage.setItem('id', id)
        this.props.searchActions.getSearch(id);
        history.push("/detail");
    }


    render() {
        const { search: { search: { searches } } } = this.props;
        // console.log(searches)

        const handleChange = (event, value) => {
            this.setState({
                page: value
            });
            const old_parmas = JSON.parse(localStorage.getItem('params'));
            const params = {
                city: old_parmas.city,
                address: old_parmas.address,
                area: old_parmas.area,
                page: value
            }
            console.log(params)
            this.props.searchActions.getSearches(params);
        };
        return (
            <div>
                <div id="search-result">
                    <div className="section-center">
                        <div className="booking-form">
                            <form>
                                <div className="d-flex">
                                    <div className="input-container">
                                        <i className="fa fa-building icon"></i>
                                        <input className="input-field city-input" type="text" placeholder="Enter City" name="city" onChange={this.change} value={this.state.city} />
                                    </div>
                                </div>
                                <div className="input-container-parent">
                                    <div className="input-container">
                                        <i className="fa fa-map-marker icon" aria-hidden="true"></i>
                                        <input className="input-field city-input" type="text" placeholder="Enter Address" name="address" onChange={this.change} value={this.state.address} />
                                    </div>
                                    <div className="input-container">
                                        <i className="fa fa-location-arrow icon"></i>
                                        <input className="input-field city-input" type="text" placeholder="Enter Area" name="area" onChange={this.change} value={this.state.area} />
                                    </div>
                                </div>
                                <button type="button" className="btn" onClick={this.handleGetResult}>Check availability</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="result">
                    {searches != null &&
                        <>
                            <div className="result-information">
                                <h3>
                                    {searches.total_entries} restaurants
                                </h3>
                                <div>
                                    Page {this.state.page} / {Math.ceil(Number(searches.total_entries) / Number(searches.per_page), 1)}
                                </div>
                            </div>
                            <div className="dflex">

                                {searches.restaurants.map((item, index) =>
                                    (<div key={index} className="item-container">
                                        <div className="item" onClick={() => this.onClickGetSearch(item.id)}>
                                            <img src={item.image_url} alt='...' className="item-img" />
                                            <div className="item-content">
                                                <h6 className="item-name">

                                                    {25 * (this.state.page - 1) + index + 1} . {item.name}
                                                </h6>
                                                <div className="item-address">
                                                    address:  {item.address}
                                                </div>
                                                <div className="item-area">
                                                    city: {item.city}
                                                </div>
                                                <div className="item-postalcode">
                                                    postal-code: {item.postal_code}
                                                </div>
                                                <div>
                                                    Price: {item.price}
                                                </div>

                                                <br></br>
                                                <div>
                                                    <a href="tel:234234" className="item-phone">
                                                        <i className="fa fa fa-phone"></i> &nbsp;
                                                 {item.phone}
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>)
                                )}

                            </div>
                            <div>
                                <Pagination count={Math.ceil(Number(searches.total_entries) / Number(searches.per_page), 1)} page={this.state.page} showFirstButton showLastButton onChange={handleChange} />
                            </div>

                        </>
                    }
                    {searches == null &&
                        <div>
                            <div className="result-information">
                                <h3>
                                    Empty
                                </h3>
                            </div>
                        </div>
                    }


                </div>
            </div>

        );
    }
}
const SearchResultWithRouter = withRouter(SearchResult);
// export default SearchResult;

export default connect(
    ({ default: { services: search } }) => ({ search }),
    dispatch => ({
        searchActions: bindActionCreators(
            { getSearches, getSearch },
            dispatch
        ),
    })

)(SearchResultWithRouter);