
import React, { Component } from 'react';

import { connect } from 'react-redux';
import profileimg from '../../assets/images/profile-user (1).png';




var cx = require('classnames');

class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = {

            errors: {},
            serverError: {},
            isLoading: false,
            Bank_Name: "",
            Iban: "",
            Account_Title: "",
            ID: "",
            Bank_Detail: [],


        };

    }

    componentDidUpdate(prevProps, prevState, snapshot) {


    }


    componentDidMount() {


    }

    render() {

        const { isLoading } = this.state;

        if (isLoading) {
            return (
                <div className="loader-large"></div>
            )
        }

        return (
            <div>
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">

                    <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 pb-5 managebookContainer">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 p-0">
                                <p className="poppins_semibold managebookheading">Settings</p>
                            </div>
                           

                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-3">
                                <div className="row">
                                    <div className="col-xl-6 col-lg-7 col-md-8 col-sm-12 col-12  mt-3">
                                        <div className="row">
                                            <div className="col-xl-4 col-lg-4 col-md-5 col-sm-12 col-12 text_align_R mt-3 ">
                                                <label className="profileinputLabel">Notification</label>

                                            </div>
                                            <div className="col-xl-8 col-lg-8 col-md-7 col-sm-12 col-12  mt-3 ">
                                            <select className="profileinput">
                                                    <option></option>
                                                    <option>Active</option>
                                                    <option>Deactive</option>

                                                </select>
                                            </div>

                                            <div className="col-xl-4 col-lg-4 col-md-5 col-sm-12 col-12 text_align_R mt-3 ">
                                                <label className="profileinputLabel">Email Newsletter</label>

                                            </div>
                                            <div className="col-xl-8 col-lg-8 col-md-7 col-sm-12 col-12   mt-3 ">
                                            <select className="profileinput">
                                                    <option></option>
                                                    <option>Active</option>
                                                    <option>Deactive</option>

                                                </select>

                                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-6 col-6 text-right p-0 mt-3 ">
                                                        <button className="profileSaveButton">Save</button>
                                                    </div>
                                            </div>

                                         
                                           
                                           
                                        </div>


                                    </div>


                                   
                              
                                </div>
                            </div>





                        </div>


                    </div>


                </div>




            </div>

        )
    }

}

Setting.propTypes = {

};


const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = ({


})
export default connect(mapStateToProps, mapDispatchToProps)(Setting);
