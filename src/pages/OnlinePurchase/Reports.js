
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { uploadEpub } from '../../store/actions/bookAction';
import Polygon from '../../assets/images/Managebooks/Polygon.svg'




var cx = require('classnames');





class Reports extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderList: null,
            itemList: null,
            restaurent_id: null,
            dashboardData: {},
            errors: {},
            serverError: {},
            isLoading: false,
            activeTab: 1,
            book_url: "",
            epub: "",
            original_book_name: "",

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
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 managebookContainer">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 p-0">
                                <p className="poppins_semibold managebookheading">Reports</p>
                            </div>

                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 pt-3 AllbookContainer ">
                                <div className="table-responsive mt-4 checkout_container ">
                                    <table className="table table-hover thead-primary ">
                                        <thead>
                                            <tr>


                                                <th scope="col table_header poppins_medium">Report Type <img className="dropicon" src={Polygon}></img>  </th>
                                                <th scope="col table_header poppins_medium">Start Date  <img className="dropicon" src={Polygon}></img> </th>
                                                <th scope="col table_header poppins_medium">End Date  <img className="dropicon" src={Polygon}></img> </th>

                                              
                                                <th scope="col table_header generateReportth poppins_medium"><button className="generateReportBtn">Generate Report</button> </th>

                                            </tr>
                                        </thead>
                                     
                                        
                                    </table>

                                </div>

                               

                            </div>





                        </div>


                    </div>


                </div>




            </div>

        )
    }

}

Reports.propTypes = {

};


const mapStateToProps = state => ({

});

const mapDispatchToProps = ({
    uploadEpub,

})
export default connect(mapStateToProps, mapDispatchToProps)(Reports);
