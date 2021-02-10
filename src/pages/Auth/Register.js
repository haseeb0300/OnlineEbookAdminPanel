
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import backgoround_img from '../../assets/images/Login/pexels-photo-3747505.svg'
import backgoround_img_shadow from '../../assets/images/Login/loginbackground.svg'
import logo from '../../assets/images/Login/logo.svg'
import Backwardarrow from '../../assets/images/Login/Backwardarrow.svg'
import { validateUser, registerUser } from '../../store/actions/authActions';



import { Dropdown, Modal, DropdownButton } from 'react-bootstrap';

import { connect } from 'react-redux';

import Noty from 'noty';
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            password2: '',
            name: '',
            otp: '',
            verifiactionSend:false,
            errors: {},
            serverError: {},
            isSigningIn: false
        };

    }
    toggleverificatiomModal = () => {
        // this.setState({ VerificatiomModal: !this.state.VerificatiomModal })

        this.props.validateUser({
            // "To_Number": this.state.phone_num,
            "user_email": this.state.email,

        }).then((res) => {
            console.log(res)
            if (res.status) {
                this.setState({
                    verifiactionSend:true
                })
            } else {
                return
            }
        }).catch((err) => {
            this.setState({ isLoading: false })
        })

    }
    handleverificatiomClosemodal = (e) => {
        this.setState({ VerificatiomModal: !this.state.VerificatiomModal })

    }
    handleChange(event) {
        if (event.target.value == 1) {
            this.setState({ VerificatiomModal: !this.state.VerificatiomModal })
        }
    }
    componentDidMount() {




    }
    componentWillReceiveProps(nextProps) {

    }

    onRegister = (e) => {
        //e.preventDefault()
        this.props.registerUser({
            "Email": this.state.email,
            "Full_Name": this.state.name,
            "Password": this.state.password,
            "Password2": this.state.password2,
            "Otp": this.state.otp,
        }).then((res) => {
            this.setState({ isLoading: false })
            console.log(res)
            if (res.status) {
                this.props.history.push('/')

            } else {
                return
            }
        }).catch((err) => {
            this.setState({ isLoading: false })
            console.log(err)
            var validationError = {}
            var serverError = []
            if (err.hasOwnProperty('validation')) {
                err.validation.map(obj => {
                    if (obj.hasOwnProperty('param')) {
                        validationError[obj["param"]] = obj["msg"]
                    } else {
                        serverError = [...serverError, obj]
                    }
                });
                this.setState({ errors: validationError });
                this.setState({ serverError: serverError });
            } else {
                this.setState({ serverError: [{ "msg": "server not responding" }] })
            }
        })
    }

    renderServerError() {
        if (this.state.serverError != null && this.state.serverError.length > 0) {
            return (

                <div className="form-group alert alert-danger mb-0" role="alert" >
                    <strong className="pr-2">Oh snap!  {"  "}</strong>
                    {this.state.serverError[0].msg}

                </div>
            )
        }
    }

    onChange = (e) => {
        console.log(e.target.name)
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { errors } = this.state
        return (
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12   ">
                <Modal


                    dialogClassName="col-sm-12"
                    show={this.state.VerificatiomModal}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >


                    <div className="  modal-body text-center">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12  mt-2 ">

                            <img className="verficationbackArrow" src={Backwardarrow}
                                onClick={() => this.handleverificatiomClosemodal()}
                            ></img>

                            <img src={logo}></img>
                        </div>
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12  mt-2 ">
                            <p className="welcome-text poppins_bold mb-0">Welcome to Little Book Company</p>
                            <p className="login_text poppins_regular mb-0">Enter your six Digit Verification Code</p>

                        </div>
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12  mt-3 text-left ">
                            <p className="login_text poppins_medium mt-4  mb-0">Enter OTP</p>
                            <input className="logininout" name="otp" onChange={this.onChange} ></input>
                            {errors.otp && <div className="invaliderrorLogin">{errors.otp}</div>}



                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12  mt-4 ">
                            <button className="registerbtn poppins_bold "
                                onClick={() => this.onRegister()}


                            >Continue</button>
                        </div>
                    </div>

                </Modal>

                <div className="row  ">
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 p-0  ">


                        <img className="Background_img" src={backgoround_img}></img>
                        <img className="Background_img" src={backgoround_img_shadow}></img>
                        <p className="img_Text1 imgg_text1  mb-0">ARE YOU NEW TO </p>
                        <p className="img_Text1 imgg_text2  mb-0">LITTLE BOOK? </p>
                        <p className="img_Text1 imgg_text3  mb-0"> SIGN UP  </p>
                        <p className="img_Text1  imgg_text4  mb-0"> TO COMPLETE REGISTRATION  </p>
                        <p className="img_Text1  imgg_text4  mb-0"> PROCESS  </p>
                        <p className="img_Text1 imgg_text5">2020 The Little Book Company  All rights reserved.</p>

                    </div>



                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 p-0  text-center ">
                        <div className="register-container">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12  mt-2 ">
                                <div className="row">
                                    <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12   ">

                                        <img class="registerLogo" src={logo}></img>
                                    </div>
                                    <div className="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-12  vertical_center  ">

                                        <label className="welcome-text poppins_bold mb-0">Welcome to Little Book Company</label>
                                    </div>
                                </div>
                                <div className="mt-2 mb-2">

                                {this.renderServerError()}
                                </div>

                           
                            </div>
                       
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12  mt-3 text-left ">
                                <p className="login_text poppins_medium mt-4  mb-0">Author / Publisher Name</p>
                                <input className="logininout" name="name" onChange={this.onChange}></input>
                                {errors.Full_Name && <div className="invaliderrorRegister">{errors.Full_Name}</div>}

                                <p className="login_text poppins_medium mt-2  mb-0" >Email</p>
                                <input className="logininout" name="email" onChange={this.onChange}></input>
                                {errors.Email && <div className="invaliderrorRegister">{errors.Email}</div>}


                                <p className="login_text poppins_medium mt-2  mb-0" >Verification Code</p>

           



                                <input className="logininout col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6" name="otp" onChange={this.onChange} disabled={!this.state.verifiactionSend?true:false}></input>
                                {errors.Otp && <div className="invaliderrorRegister2 ">{errors.Otp}</div>}

                                <button className="vericationbtn poppins_semibold col-xl-5 col-lg-5 col-md-5 col-sm-5 col-5" disabled = {this.state.email === ""?true:false}  onClick={() => this.toggleverificatiomModal()} >get a verfication code</button>

                                <p className="login_text poppins_medium mt-4  mb-0">Password</p>
                                <input className="logininout" name="password" type="password" onChange={this.onChange}></input>
                                {errors.Password && <div className="invaliderrorRegister">{errors.Password}</div>}

                                <p className="login_text poppins_medium mt-4  mb-0">Re Password</p>
                                <input className="logininout" name="password2" type="password" onChange={this.onChange}></input>
                                {errors.Password2 && <div className="invaliderrorRegister">{errors.Password2}</div>}



                            </div>

                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12  mt-4 ">
                                <button className="registerbtn poppins_bold " 
                                // disabled={this.state.otp === ""?true:false}
                                   onClick={() => this.onRegister()}


                                >Register Now</button>

                            </div>


                        </div>
                    </div>
                </div>

            </div>



        )
    }

}

Register.propTypes = {

};


const mapStateToProps = state => ({
    auth: state.auth,

});

const mapDispatchToProps = ({
    validateUser,
    registerUser,
})
export default connect(mapStateToProps, mapDispatchToProps)(Register);
