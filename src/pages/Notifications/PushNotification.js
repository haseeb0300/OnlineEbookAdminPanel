
import React, { Component } from 'react';

import { connect } from 'react-redux';

import searchicon from '../../assets/images/Managebooks/searchicon.svg'
import Polygon from '../../assets/images/Managebooks/Polygon.svg'
import tableBook from '../../assets/images/Managebooks/tableBook.svg'
import plus from '../../assets/images/Managebooks/plus.png'
import printIcon from '../../assets/images/Managebooks/print.png'

import { Dropdown, Modal, Form, DropdownButton } from 'react-bootstrap';

import moment from 'moment'
import Moment from 'react-moment';
import CloseIcon from '../../assets/images/purchasehistory/PrintModal/close.png'
import PlaceHolder from '../../assets/images/purchasehistory/PlaceHolder.png'


import { getAllOrder, sortOrderByBook, sortOrderByOrder, searchBook, getTotalEarning, getTotalPending } from '../../store/actions/orderAction';




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

                <div className="col-12 managebookContainer">
                    <p className="poppins_semibold managebookheading">All Notifications</p>
                </div>
                <div className="col-12 Notification-Container">
                    <div className="row">
                        <div className="col-3">
                            <p className="poppins_semibold NotificationBoldText mb-0">COVID-19! STAY SAFE, STAY HOME
</p>

                        </div>
                        <div className="col-3">
                            <p className="poppins_regular NotificationBoldText mb-0">Here is an article on how you can continue your studies with while staying at home. Give it a read.</p>
                            <p className="poppins_regular NotificationBoldText mt-5 mb-0"> <label className="poppins_semibold">Launches</label>: Web/App Link</p>
                            <p className="poppins_regular NotificationLinkText mb-0">https://www.littlebookcompany.net/</p>
                        </div>
                        <div className="col-3">
                            <button className="Segemntbtn">SEGMENT</button>
                            <p className="NotificationBoldText poppins_medium mt-3">All male users who are verified</p>

                        </div>
                        <div className="col-3">
                            <p className="NotificationBoldText poppins_bold LSpace mb-0">MAR 05, 2020</p>
                            <p className="NotificationBoldText poppins_bold LSpace">05:30PM</p>
                            <p className="NotificationBoldText poppins_bold LSpace mt-4">Status</p>
                            <p className="NotificationLightText poppins_bold LSpace  ml-4"><div className="roundRed"></div>processing</p>
                            <p className="NotificationLightText poppins_medium LSpace mt-4 mb-0 ">Targeted :<label className="poppins_bold ml-1"> 350</label></p>
                            <p className="NotificationLightText poppins_medium LSpace  mb-0 ">Delivered :<label className="poppins_bold ml-1"> 157</label></p>


                        </div>
                    </div>

                </div>
                <div className="col-12 mt-3 Notification-Container">
                    <div className="row">
                        <div className="col-3">
                            <p className="poppins_semibold NotificationBoldText mb-0">COVID-19! STAY SAFE, STAY HOME
</p>

                        </div>
                        <div className="col-3">
                            <p className="poppins_regular NotificationBoldText mb-0">Here is an article on how you can continue your studies with while staying at home. Give it a read.</p>
                            <p className="poppins_regular NotificationBoldText mt-5 mb-0"> <label className="poppins_semibold">Launches</label>: Web/App Link</p>
                            <p className="poppins_regular NotificationLinkText mb-0">https://www.littlebookcompany.net/</p>
                        </div>
                        <div className="col-3">
                            <button className="Segemntbtn">SEGMENT</button>
                            <p className="NotificationBoldText poppins_medium mt-3">All male users who are verified</p>

                        </div>
                        <div className="col-3">
                            <p className="NotificationBoldText poppins_bold LSpace mb-0">MAR 05, 2020</p>
                            <p className="NotificationBoldText poppins_bold LSpace">05:30PM</p>
                            <p className="NotificationBoldText poppins_bold LSpace mt-4">Status</p>
                            <p className="NotificationLightText poppins_bold LSpace  ml-4"><div className="roundRed"></div>processing</p>
                            <p className="NotificationLightText poppins_medium LSpace mt-4 mb-0 ">Targeted :<label className="poppins_bold ml-1"> 350</label></p>
                            <p className="NotificationLightText poppins_medium LSpace  mb-0 ">Delivered :<label className="poppins_bold ml-1"> 157</label></p>


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
