import React from 'react';
import { Route,  Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';

/** Import scenes */
import Search from './scenes/Search';
import SearchResult from './scenes/SearchResult';
import SearchDetail from './scenes/SearchDetail';
///  Import logo svg
import logo from './../..//assets/images/logo.svg'
class Home extends React.Component {
    componentDidMount() {
    }
    goHome =() => {
        const { history } = this.props;
        history.push("/");
    }

    render() {
        const { search: { search: {loading}}} = this.props
        if (loading) {
            Swal.fire({
                title: 'Please wait...',
                text: 'getting data in...',
                onOpen: () => {
                    Swal.showLoading();
                },
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false
            });
        } else {
            Swal.close();
        }

        return (
            <div>
                <img src={logo} className="logo-img" onClick={()=>this.goHome()}/>
                <Switch>
                    <Route path="/result" exact render={props => <SearchResult {...props} />} />
                    <Route path="/detail" exact render={props => <SearchDetail {...props} />} />
                    <Route path="/" render={props => <Search {...props} />} />
                </Switch>
            </div>
        );
    }
}

export default connect(
    ({ default: { services: search } }) => ({ search }),
    null)(Home);