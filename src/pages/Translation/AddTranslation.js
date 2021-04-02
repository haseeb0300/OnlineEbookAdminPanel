
import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Dropdown, Modal, Form, DropdownButton } from 'react-bootstrap';
import { uploadEpub } from '../../store/actions/bookAction';
import searchicon from '../../assets/images/Managebooks/searchicon.svg'
import Polygon from '../../assets/images/Managebooks/Polygon.svg'
import closeImg from '../../assets/images/Managebooks/Modal/close.png'
import visibility from '../../assets/images/Managebooks/visibility.svg'
import { getAllBooks, sortAllBooks, searchBook, createBook } from '../../store/actions/bookAction';
import moment from 'moment'
import Moment from 'react-moment';
import dropdownIcon from '../../assets/images/Translation/dropdown.png'

import pencil from '../../assets/images/Translation/pencil.png'







var cx = require('classnames');





class AddTranslation extends Component {
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
            sortByAuthorName: false,
            sortByName: false,
            sortByDate: false,
            sortByStatus: false,
            bookList: {},
            newBoolList: [],
            search: '',
            Active_Status: false,
            CategoryModal: false,


        };

    }

    componentDidUpdate(prevProps, prevState, snapshot) {


    }

    componentWillMount() {


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
                <Modal


                    dialogClassName="col-xl-12 "
                    show={this.state.CategoryModal}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >


                    <div className="  modal-body">
                        <div className="container-fluid ModalContainer">
                            <div className="col-12">
                                <div className="row">
                                    <div className="col-10">
                                        <p className="poppins_medium ModalHading">Manage Category</p>
                                    </div>
                                    <div className="col-2 text-right">
                                        <img className="Hov" onClick={() => this.setState({ CategoryModal: false })} src={closeImg} />
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 mt-5">
                                <div className="row">
                                    <div className="col-3 Vertical_center text-right">
                                        <p className="poppins_medium Modaltext mb-0">Category  ID</p>
                                    </div>
                                    <div className="col-9 ">
                                        <input className="ModalInput col-4 "></input>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 mt-4">
                                <div className="row">
                                    <div className="col-3 Vertical_center text-right">
                                        <p className="poppins_medium Modaltext mb-0">Category  Name</p>
                                    </div>
                                    <div className="col-9 ">
                                        <input className="ModalInput col-7 "></input> <br></br>


                                    </div>
                                </div>
                            </div>

                            <div className="col-12 mt-3">
                                <div className="row">
                                    <div className="col-3 Vertical_center text-right"></div>


                                    <div className="col-9 ">

                                        <input className="" type="checkbox" />
                                        <label className="ml-3 mb-0 CheckBoxLabel poppins_medium" >Make parent category</label>

                                    </div>
                                </div>
                            </div>
                            <div className="col-12 mt-4">
                                <div className="row">
                                    <div className="col-3 Vertical_center text-right">
                                        <p className="poppins_medium Modaltext mb-0">Sub Category</p>
                                    </div>
                                    <div className="col-9 ">
                                        <input className="ModalInput col-7 "></input> <br></br>


                                    </div>
                                </div>
                            </div>

                            <div className="col-12 mt-5">
                                <div className="row">
                                    <div className="col-3 Vertical_center text-right">
                                        <p className="poppins_medium Modaltext mb-0">Status</p>
                                    </div>
                                    <div className="col-9 checkout_container ">
                                        <label class="blackSwitch">
                                            <input type="checkbox" />
                                            <span class="blackslider round"></span>
                                        </label>

                                    </div>
                                </div>
                            </div>
                            <div className="col-12 text-center mt-5">
                                <p className="poppins_medium DeleteText">Delete this Category</p>

                            </div>
                            <div className="col-12 text-center">
                                <button className="mdlBtn col-5 poppins_semibold">Save Changes</button>
                            </div>
                        </div>

                    </div>


                </Modal>

                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 AddTranslation">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 managebookContainer">
                        <p className="poppins_semibold Allbook-heading-main">Add Translations</p>
                    </div>
                    <div className="col-12 AddTranslation managebookContainer">
                        <div className="row">
                            <div className="col-md-4 ">
                                <select className="col-12 TranslationInput ">
                                    <option>Select Language</option>
                                </select>
                            </div>
                            <div className="col-md-6 p-0">
                                <input className="col-12 TranslationInput"></input>

                            </div>
                            <div className="col-md-2 p-0">
                                <button className="SearchBtn">Search Now</button>

                            </div>
                        </div>
                    </div>

                    <div className="TranslationContainer">
                        <div className="container-fluid">
                            <div className="col-12 text-right">

                                <label className="EditPencil"> <img src={pencil} /> Edit</label>
                                <button className="SaveBtn">Save</button>
                            </div>

                            <div className="col-12  mt-4 pl-5">
                                <div className="row">
                                    <div className="col-6 pl-5">
                                        <p className="TranslationHeading mb-0">Original Text <img className="ml-3 mr-3" src={dropdownIcon} /></p>


                                    </div>
                                    <div className="col-6">
                                        <p className="TranslationHeading mb-0">Translation <img className="ml-3 mr-3" src={dropdownIcon} /></p>

                                    </div>
                                </div>
                            </div>

                            <div className="col-12 bg-div mt-4 pl-5">
                                <div className="row">
                                    <div className="col-6 vertical_center pl-5">
                                        <p className="TranslationHeading mb-0">About</p>


                                    </div>
                                    <div className="col-6 pr-1">
                                        <input className="Inputt"></input>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12   pl-5">
                                <div className="row">
                                    <div className="col-6 vertical_center pl-5">
                                        <p className="TranslationHeading mb-0">Subject</p>


                                    </div>
                                    <div className="col-6 pr-1">
                                        <input className="Inputt bg-div"></input>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 bg-div   pl-5">
                                <div className="row">
                                    <div className="col-6 vertical_center pl-5">
                                        <p className="TranslationHeading mb-0">Client</p>


                                    </div>
                                    <div className="col-6 pr-1">
                                        <input className="Inputt "></input>
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

AddTranslation.propTypes = {

};


const mapStateToProps = state => ({
    auth: state.auth


});

const mapDispatchToProps = ({
    uploadEpub,
    getAllBooks,
    sortAllBooks,
    searchBook,
    createBook,
})
export default connect(mapStateToProps, mapDispatchToProps)(AddTranslation);
