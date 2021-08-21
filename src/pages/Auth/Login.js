
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import backgoround_img from '../../assets/images/Login/pexels-photo-3747505.svg'
import backgoround_img_shadow from '../../assets/images/Login/loginbackground.svg'
import logo from '../../assets/images/Logo.png'
import { Link, withRouter } from 'react-router-dom';
import { loginUser } from '../../store/actions/authActions';




import { connect } from 'react-redux';

import Noty from 'noty';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            User_ID: '',
            Full_Name: '',
            Email: '',
            profile: {},
            errors: {},
            serverError: {},
            isSigningIn: false
        };

    }
    componentDidMount() {

        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }

    }

    onCreateAccount = () => {
        this.props.history.push('/register');
    }

    onLogin = () => {

        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.setState({ isSigningIn: true })

        this.props.loginUser(userData).then(res => {
            this.setState({ isSigningIn: false })

            if (res.status) {
                this.props.history.push('/');
                return
            } else {
                return
            }

        }).catch(err => {
            this.setState({ isSigningIn: false })
            var validationError = {}
            var serverError = []
            console.log(err.hasOwnProperty('validation'))

            if (err.hasOwnProperty('validation')) {
                err.validation.map(obj => {
                    if (obj.hasOwnProperty('param')) {
                        validationError[obj["param"]] = obj["msg"]
                    } else {
                        serverError = [...serverError, obj]
                    }
                    console.log(obj["msg"])
                });
                this.setState({ errors: validationError });
                this.setState({ serverError: serverError });
            } else {
                this.setState({ serverError: [{ "msg": "server not responding" }] })
            }
        });


    }
    componentWillReceiveProps(nextProps) {

    }

    renderServerError() {
        if (this.state.serverError != null && this.state.serverError.length > 0) {
            return (

                <div className="form-group alert alert-danger" role="alert" >
                    <strong className="pr-2">Oh snap!  {"  "}</strong>
                    {this.state.serverError[0].msg}

                </div>
            )
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { errors } = this.state
        return (
            <div className="div-cotainer">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12   ">
                    <div className="row  ">
                        <div className=" col-12 p-0  text-center ">
                            <div className="login-container1">
                            {this.renderServerError()}

                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12  mt-2 ">

                                    <img src={logo}></img>
                                </div>


                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12  mt-5 text-center ">
                                    <input className="logininout" type="email" name="email" onChange={this.onChange} placeholder="Email Address "></input>
                                    {errors.email && <div className="invaliderrorLogin">{errors.email}</div>}

                                    <input className="logininout" name="password" type="password" onChange={this.onChange} placeholder="Password"></input>
                                    {errors.password && <div className="invaliderrorLogin">{errors.password}</div>}

                                </div>
                                <div className="col-md-9  col-12 p-0 mt-4 text-right ">
                                    <button className="login_btn poppins_bold" onClick={this.onLogin}>Login</button>


                                </div>
                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12  mt-4 ">
                                    {/* <button className="login_btn poppins_bold" onClick={this.onLogin}>Login</button> */}

                                </div>
                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12  mt-4 lastText">
                                    <label className="login_text poppins_medium ">2020 The Little Book Company  All rights reserved.</label>
                                    {/* <label className="login_text poppins_medium mt-2  mb-0">Don't have an account? 
                                <Link to="/register">

                                <label className="poppins_bold pointerr"> Create Account</label> 
                                </Link>
                                </label> */}

                                </div>

                            </div>
                        </div>
                    </div>

                </div>


            </div>

        )
    }

}

Login.propTypes = {

};


const mapStateToProps = state => ({
    auth: state.auth,

});

const mapDispatchToProps = ({
    loginUser
})
export default connect(mapStateToProps, mapDispatchToProps)(Login);
