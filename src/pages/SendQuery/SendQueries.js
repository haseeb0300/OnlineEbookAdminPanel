
import React, { Component } from 'react';

import { connect } from 'react-redux';

import searchicon from '../../assets/images/Managebooks/searchicon.svg'
import Polygon from '../../assets/images/Managebooks/Polygon.svg'
import tableBook from '../../assets/images/Managebooks/tableBook.svg'
import visibility from '../../assets/images/Managebooks/visibility.svg'
import edit from '../../assets/images/Managebooks/edit.svg'

import { createBankDetail, getBankAccount } from '../../store/actions/bankAction';


var cx = require('classnames');

class SendQueries extends Component {
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
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 managebookContainer">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 p-0">
                                <p className="poppins_semibold managebookheading">Send Message</p>
                            </div>

                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-5">
                                <div className="row">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12  mt-3">
                                        <p className="heading_bank mb-0">Send us your Queries and Problems</p>
                                        <p className="poppins_light mb-0 sendquery24hour">Will be answer with in a 24 hours</p>
                                        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12 p-0">
                                            <div className="">
                                                <input className="sendqueryInput" placeholder="Issue" ></input>
                                                <input className="sendqueryInput" placeholder="Subject"></input>
                                                <textarea className="sendqueryTextArea" placeholder="Description"  ></textarea>
                                                <div className="text-right mt-5">

                                                    <button className="poppins_bold sendquerybtn" >Send Queries</button>
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

SendQueries.propTypes = {

};


const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = ({
    createBankDetail,
    getBankAccount,

})
export default connect(mapStateToProps, mapDispatchToProps)(SendQueries);
