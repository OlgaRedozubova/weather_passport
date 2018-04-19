import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { authSingOut } from "../../actions";

const loginUserName = () => {
    if (window.localStorage.getItem('ls_token') && window.localStorage.getItem('ls_token').length > 15) {
        if (window.localStorage.getItem('ls_username') && window.localStorage.getItem('ls_username').length > 0) {
            return window.localStorage.getItem('ls_username')
        }else {
            return ''
        }
    } else {
        return ''
    }
};

export const isLogin = () => {
    if (window.localStorage.getItem('ls_token') && window.localStorage.getItem('ls_token').length > 15) {
        return true
    } else {
        return false
    }
};


class Auth extends Component{
    constructor (props) {
        super(props);
    }
    static propTypes = {
        history: PropTypes.object.isRequired
    };

    render () {
        const { history } = this.props;
        console.log('this.props', this.props);
        return (
            <div className="top">

                {isLogin() ? (
                    <div className="top_login">
                        <p>Signed in as: {loginUserName()}</p>
                        <a href="#" onClick={(e) => {
                            e.preventDefault();
                            this.props.singOut();
                            window.localStorage.clear();
                            history.push("/");
                        }}>Sing out</a>
                    </div>
                ) : (
                    <div className="top_login">
                        <p>You are not logged in.</p>
                        <a href="#" onClick={(e) => {
                            history.push("/login");
                        }}>Sing In</a>
                    </div>
                )
                }

            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        username: state.authReducer.username,
        token: state.authReducer.token,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        singOut: () => {
            console.log('SingOut');
            dispatch(authSingOut());
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth));