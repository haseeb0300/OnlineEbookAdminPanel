
import React, { Component } from 'react';

import { connect } from 'react-redux';
import cutLogo from '../../assets/images/cutLogo.png';
import deleteIcon from '../../assets/images/delete.png';





var cx = require('classnames');

class Notification extends Component {
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
                                <p className="poppins_semibold managebookheading">Notification</p>
                            </div>
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 notificationCotainer ">
                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12  ">

                                    <p className="notificationHeading">All Notifications</p>
                                </div>
                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12  notificationColorRow  ">
                                    <div className="row  ">
                                        <div className="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-1 text-right vertical_center ">
                                            <img src={cutLogo}></img>
                                        </div>
                                        <div className="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-10  ">
                                            <p className="poppins_medium mb-0">Latest Update</p>
                                            <p className="poppins_extralight notificationtext mb-0">Now you can add bundle Offers</p>

                                        </div>
                                        <div className="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-1 text-right vertical_center ">
                                        <img  className="pointerr" src={deleteIcon}></img>
                                        </div>


                                    </div>


                                </div>

                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12  notificationWhiteRow  ">
                                    <div className="row  ">
                                        <div className="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-1 text-right vertical_center ">
                                            <img src={cutLogo}></img>
                                        </div>
                                        <div className="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-10  ">
                                            <p className="poppins_medium mb-0">Latest Update</p>
                                            <p className="poppins_extralight notificationtext mb-0">Now you can add bundle Offers</p>

                                        </div>
                                        <div className="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-1 text-right vertical_center ">
                                            <img  className="pointerr" src={deleteIcon}></img>
                                        </div>


                                    </div>


                                </div>

                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12  notificationColorRow  ">
                                    <div className="row  ">
                                        <div className="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-1 text-right vertical_center ">
                                            <img src={cutLogo}></img>
                                        </div>
                                        <div className="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-10  ">
                                            <p className="poppins_medium mb-0">Latest Update</p>
                                            <p className="poppins_extralight notificationtext mb-0">Now you can add bundle Offers</p>

                                        </div>
                                        <div className="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-1 text-right vertical_center ">
                                        <img  className="pointerr" src={deleteIcon}></img>
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

Notification.propTypes = {

};


const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = ({


})
export default connect(mapStateToProps, mapDispatchToProps)(Notification);
