
import React, { Component } from 'react';

import { connect } from 'react-redux';

var cx = require('classnames');





class Segment extends Component {
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
                <div className="col-12 mt-3 Notification-Container">
                    <div className="row">
                        <div className="col-6">
                            <div className="row">
                                <div className="col-6">
                                    <p className="poppins_bold SegementQuery">Query</p>
                                </div>
                                <div className="col-6"></div>
                                <div className="col-5">
                                    <select className="SegmentDropDown">
                                        <option>All male users</option>
                                    </select>
                                </div>
                                <div className="col-1 vertical_center">
                                    <p className="poppins_bold SegementQuery mb-0">Who</p>
                                </div>

                                <div className="col-5">
                                    <select className="SegmentDropDown">
                                        <option>All male users</option>
                                    </select>

                                </div>

                            </div>


                        </div>
                        <div className="col-6 text-right vertical_center">
                            <button className="SegmentViewBTn">View All</button>
                        </div>

                    </div>

                </div>

                <div className="SegmentMiddileDiv">
                    <p className="mb-0 poppins_regular"><label className="poppins_bold mr-2 mb-0">70,245 </label>users found in this segment</p>
                </div>
                <div className="col-12  Notification-Container">
                    <div className="row">
                        <div className="col-6">
                            <div className="row">
                                <div className="col-6">
                                    <p className="poppins_bold SegementQuery">Target</p>
                                </div>
                                <div className="col-6"></div>
                                <div className="col-4">
                                    <p className="">
                                        <input id="ABC" type="radio"    />
                                        <label className="poppins_bold SegmentRadioLabel ml-3" for="ABC">On board</label>

                                    </p>
                              
                                </div>
                                

                                <div className="col-4">
                                <p className="">
                                        <input id="ABCD" type="radio"    />
                                        <label className="poppins_bold SegmentRadioLabel ml-3" for="ABCD">Topic Subscribers</label>

                                    </p>
                              

                                </div>

                            </div>


                        </div>
                        <div className="col-6 text-center vertical_center">
                            <button className="SegmentViewBTn">V</button>
                            <button className="SegmentViewBTn">V</button>

                        </div>

                    </div>


                </div>

            </div>
        )
    }

}

Segment.propTypes = {

};


const mapStateToProps = state => ({

});

const mapDispatchToProps = ({

})
export default connect(mapStateToProps, mapDispatchToProps)(Segment);
