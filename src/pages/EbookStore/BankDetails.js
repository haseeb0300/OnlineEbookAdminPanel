
import React, { Component } from 'react';

import { connect } from 'react-redux';

import searchicon from '../../assets/images/Managebooks/searchicon.svg'
import Polygon from '../../assets/images/Managebooks/Polygon.svg'
import tableBook from '../../assets/images/Managebooks/tableBook.svg'
import visibility from '../../assets/images/Managebooks/visibility.svg'
import edit from '../../assets/images/Managebooks/edit.svg'

import { createBankDetail, getBankAccount } from '../../store/actions/bankAction';








var cx = require('classnames');





class BankDetails extends Component {
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
        this.handleChange = this.handleChange.bind(this);

    }

    componentDidUpdate(prevProps, prevState, snapshot) {


    }


    componentDidMount() {
        this.props.getBankAccount().then((res) => {
            console.log(res.content)
            if (res.status == true) {

                this.setState({
                    Bank_Detail: res.content[0],

                })

            }
            else {
                alert(res)
            }
        }).catch((err) => {
            console.log(err)

        })

    }
    onClickEdit = () => {
        console.log(this.state.Bank_Detail)
        this.setState({
            Bank_Name: this.state.Bank_Detail.Bank_Name,
            Iban: this.state.Bank_Detail.Iban,
            Account_Title: this.state.Bank_Detail.Account_Title,
            ID: this.state.Bank_Detail.ID,

        })
    }
    togglecongratulationModal = () => {
        this.setState({ CongratulationModal: !this.state.CongratulationModal })
    }




    handlecongratulationClosemodal = (e) => {
        this.setState({ CongratulationModal: !this.state.CongratulationModal })

    }
    handleChange(event) {
        if (event.target.value == 1) {
            this.setState({ CongratulationModal: !this.state.CongratulationModal })
        }


    }


    onChange = (e) => {

        this.setState({ [e.target.name]: e.target.value })
    }

    onCreateBankDetail = () => {
        this.setState({ errors: {}, serverError: {} })
        var bankData = {
            "Bank_Name": this.state.Bank_Name,
            "Iban": this.state.Iban,
            "Account_Title": this.state.Account_Title,
            "ID": this.state.ID,

        }
        this.props.createBankDetail(bankData).then((res) => {
            //console.log(res)
            if (res.status) {
                let arr = []
                arr.push(res.content[0] && res.content[0].Bank)
                //console.log(res.content)
                this.setState({
                    Bank_Detail: bankData,
                    Bank_Name: '',
                    Iban: '',
                    Account_Title: '',
                    ID: '',

                }, () => console.log(this.state.Bank_Detail))
                // this.props.history.push('/menu/menugrid');
            }
        }).catch((err) => {
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
                                <p className="poppins_semibold managebookheading">Add Bank Details</p>
                            </div>

                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-5">
                                <div className="row">
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12  mt-3">
                                        <p className="heading_bank">Bank Information</p>
                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 p-0">
                                            <div className="bankinfocontainer">
                                                <p className="poppins_regular bankinfoinputlabel" >Bank Name</p>
                                                <input className="bankinfoInput" name="Bank_Name" onChange={this.onChange} value={this.state.Bank_Name}></input>
                                                <p className="poppins_regular bankinfoinputlabel" >Bank Account Number / IBAN</p>
                                                <input className="bankinfoInput" name="Iban" onChange={this.onChange} value={this.state.Iban}></input>
                                                <p className="poppins_regular bankinfoinputlabel" >Account Title</p>
                                                <input className="bankinfoInput" name="Account_Title" onChange={this.onChange} value={this.state.Account_Title}></input>
                                                <div className="text-center mt-5">

                                                    <button className="poppins_bold saveinfobtn" disabled={this.state.Bank_Name === "" || this.state.Iban === "" || this.state.Account_Title === ""} onClick={this.onCreateBankDetail}>Save info</button>
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                    {this.state.Bank_Detail && this.state.Bank_Detail.length !== 0 && (
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mt-3 ">
                                            <p className="heading_bank">Bank Details</p>
                                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 p-0">
                                                <div className="bankinfocontainer">
                                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 p-0 ">
                                                        <div className="row ">
                                                            <div className="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-10  ">
                                                                <p className="mb-0 poppins_regular">{this.state.Bank_Detail.Bank_Name}</p>
                                                                <p className="mb-0 poppins_regular">{this.state.Bank_Detail.Iban}</p>
                                                                <p className="mb-0 poppins_regular">{this.state.Bank_Detail.Account_Title}</p>
                                                            </div>
                                                            <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2  vertical-center">
                                                                <img className="pointerr" src={edit} onClick={() => this.onClickEdit()}></img>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>





                        </div>


                    </div>


                </div>




            </div>

        )
    }

}

BankDetails.propTypes = {

};


const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = ({
    createBankDetail,
    getBankAccount,

})
export default connect(mapStateToProps, mapDispatchToProps)(BankDetails);
