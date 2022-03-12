
import React, { Component } from 'react';

import { connect } from 'react-redux';

import mac from '../../assets/images/PushNoty/mac.png'
import android from '../../assets/images/PushNoty/android.png'
import phone from '../../assets/images/PushNoty/phone.png'
import msg from '../../assets/images/PushNoty/msg.png'


import { Dropdown, Modal, Form, DropdownButton } from 'react-bootstrap';

import moment from 'moment'
import Moment from 'react-moment';
import CloseIcon from '../../assets/images/purchasehistory/PrintModal/close.png'
import PlaceHolder from '../../assets/images/purchasehistory/PlaceHolder.png'


import { getAllOrder, sortOrderByBook, sortOrderByOrder, searchBook, getTotalEarning, getTotalPending } from '../../store/actions/orderAction';
import { Link, withRouter } from 'react-router-dom';




var cx = require('classnames');





class PushNotification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderList: [],
            errors: {},
            serverError: {},
            isLoading: false,
            sortByName: false,
            sortByDate: false,
            sortByStatus: false,
            sortByReference: false,
            sortByPrice: false,
            search: '',
            totalearning: '',
            pendingTotal: '',
            dayEarning: '',
            dayPending: '',
            PrintModal: false,
            ReferenceModal: false,


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
            <div className=" col-12">


                <div className="col-12 Notification-Container">
                    <div className="col-12">
                        <p className="poppins_bold QieryHeading">QUERY</p>
                    </div>
                    <div className="col-12 mt-3">
                        <div className="row">
                            <div >
                                <select className="QuerySelect">
                                    <option>All Male Users</option>
                                </select>

                            </div>
                            <div className="vertical_center">
                                <p className="poppins_regular mb-0 ml-3 mr-3">Who</p>
                            </div>
                            <div >
                                <select className="QuerySelect">
                                    <option>Are verified</option>
                                </select>

                            </div>
                      
                       
                        </div>
                        <div className="text-right">
                        <Link to="/allsegments" >

                       <button className="ViewALlBtn">View All</button>
                       </Link>

                       </div>
                    </div>
                </div>

                <div className="userbackground">
                    <p className="poppins_regular mb-0"><b>70,245 users </b> found in this segment</p>
                </div>
                <div className="col-12 Notification-Container">
                    <div className="row">
                        <div className="col-6">
                            <p className="poppins_bold QieryHeading">Target</p>
                            <div className="row m-0">

                                <p className="payment_methodImgHeight mt-3">
                                    <input type="radio" id="onBoard" name="option" onChange={this.onChange} value="onBoard" />
                                    <label className="poppins_bold OnBoard" for="onBoard" >ON BOARD</label>
                                </p>
                                <p className="payment_methodImgHeight ml-4 mt-3">
                                    <input type="radio" id="onBoard1" name="option" onChange={this.onChange} value="onBoard1" />
                                    <label className="poppins_bold OnBoard" for="onBoard1" >TOPIC SUBSCRIBERS</label>
                                </p>
                            </div>
                            <div className="noty-input-container">
                                <p className="poppins_bold SelectLAbel mb-0">SELECT TOPIC</p>
                                <select className="notySelect">
                                    <option>Select Topic</option>
                                </select>
                            </div>

                            <div className="noty-input-container">
                                <p className="poppins_bold SelectLAbel mb-0">TITLE <i className="optionaltext">- Optional</i></p>
                                <input className="notyInput" placeholder="COVID-19! STAY SAFE, STAY HOME" />

                            </div>

                            <div className="noty-input-container">
                                <p className="poppins_bold SelectLAbel mb-0">SUB-TITLE <i className="optionaltext">- Optional</i></p>
                                <input className="notyInput" placeholder="Add Subtitle" />

                            </div>
                            <div className="noty-input-container">
                                <p className="poppins_bold SelectLAbel mb-0">Message</p>
                                <textarea className="notyTextArea" placeholder="Here is an article on how you can continue your reading while staying at home. Give it a read."></textarea>

                            </div>
                            <div className="noty-input-container checkout_container userbackgroundContainer">
                                <label className="blackSwitch">
                                    <input type="checkbox" />
                                    <span className="blackslider round"></span>
                                    <label className="poppins_bold SelectLAbel lauchTxt  mb-0">LAUNCH</label>
                                </label>
                                <p className="payment_methodImgHeight ml-4 mb-0 mt-3">
                                    <input type="radio" id="ViaEmail" name="option" onChange={this.onChange} value="ViaEmail" />
                                    <label className="poppins_bold OnBoard" for="ViaEmail" >Via Email</label>
                                </p>
                                <input className="notyInput" placeholder="https://www.littlebookcompany.net/" />
                                <p className="payment_methodImgHeight ml-4 mb-0 mt-3">
                                    <input type="radio" id="ViaEmail" name="option" onChange={this.onChange} value="ViaEmail" />
                                    <label className="poppins_bold OnBoard" for="ViaEmail" >Little book company App Screen</label>
                                </p>
                                <select className="notySelect"  >
                                    <option>Select Screen</option>
                                </select>


                            </div>

                            <div className="noty-input-container checkout_container userbackgroundContainer">
                                <label className="blackSwitch">
                                    <input type="checkbox" />
                                    <span className="blackslider round"></span>
                                    <label className="poppins_bold SelectLAbel lauchTxt  mb-0">SendLater</label>
                                </label>
                              
                                <input type="date" className="notySelect mt-2"  />
                              
                            


                            </div>

<div className="text-right">
    <button className="notyCancelBtn">Cancel</button>
    <button className="notyAcptBtn">Send Now</button>
</div>
                        </div>
                        <div className="col-6 text-center">
                            <button className="MacBtn">
                                <img src={mac} />
                            </button>
                            <button className="AndroidBtn">
                                <img src={android} />
                            </button>
                            <div>
                                <img src={phone} />
                                <img className="msg" src={msg} />
                            </div>
                        </div>
                    </div>


                </div>

            </div>
        )
    }

}

PushNotification.propTypes = {

};


const mapStateToProps = state => ({

});

const mapDispatchToProps = ({

})
export default connect(mapStateToProps, mapDispatchToProps)(PushNotification);
