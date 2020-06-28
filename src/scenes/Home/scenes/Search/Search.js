import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toastr } from 'react-redux-toastr';

// Import actions
import {
    getSearches
} from '../../../../services/search/searchActions';

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            city: '',
            address: '',
            area:''
        };
        this.change = this.change.bind(this);
        this.handleGetResult = this.handleGetResult.bind(this);
    } 
    componentDidMount() {
    }

    change(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleGetResult() {
        const { city, address, area } = this.state;
        const {history} = this.props;
        if (city === null || city === '') {
            toastr.error('City name is missing', 'You must provide city name');
            return;
        }
        const params= {
            city: city,
            address: address,
            area:area
        }
        localStorage.setItem('params', JSON.stringify(params))
        this.props.searchActions.getSearches(params);
        history.push("/result");
        
    }
    render() {
        return (
            <div id="search">
                
                <div className="section-center">
                    <div className="booking-form">
                        <form>
                            <div className="d-flex">
                                <div className="input-container">
                                    <i className="fa fa-building icon"></i>
                                    <input className="input-field city-input" type="text" placeholder="Enter City" name="city" onChange={this.change} />
                                </div>
                            </div>
                            <div className="d-flex">
                                <div className="input-container">
                                    <i className="fa fa-map-marker icon" aria-hidden="true"></i>
                                    <input className="input-field city-input" type="text" placeholder="Enter Address" name="address" onChange={this.change} />
                                </div>
                                <div className="input-container">
                                    <i className="fa fa-location-arrow icon"></i>
                                    <input className="input-field city-input" type="text" placeholder="Enter Area" name="area" onChange={this.change} />
                                </div>
                            </div>
                            <button type="button" className="btn" onClick={this.handleGetResult}>Check availability</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const SearchWithRouter = withRouter(Search);

export default connect(
    ({ default: { services:  search  } }) => ({ search }),
    dispatch => ({
        searchActions: bindActionCreators(
            { getSearches },
            dispatch
        ),
    })
)(SearchWithRouter);