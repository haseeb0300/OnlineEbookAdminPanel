
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
