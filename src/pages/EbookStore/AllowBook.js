
import React, { Component } from 'react';

import { connect } from 'react-redux';
import progressicon from '../../assets/images/progressIcon.png'
import epubuploadicon from '../../assets/images/epubupload.svg'
import { Dropdown, Modal, Form, DropdownButton } from 'react-bootstrap';
import crossbtn from '../../assets/images/CongratulationModal/crossBtn.svg';
import BackArrow from '../../assets/images/CongratulationModal/back-arrow.svg';
import storytelling from '../../assets/images/CongratulationModal/storytelling.svg';
import { uploadEpub } from '../../store/actions/bookAction';
import searchicon from '../../assets/images/Managebooks/searchicon.svg'
import Polygon from '../../assets/images/Managebooks/Polygon.svg'
import tableBook from '../../assets/images/Managebooks/tableBook.svg'
import visibility from '../../assets/images/Managebooks/visibility.svg'
import { getAllBooks, sortAllBooks, searchBook, createBook } from '../../store/actions/bookAction';
import moment from 'moment'
import Moment from 'react-moment';









var cx = require('classnames');





class ManageBook extends Component {
    constructor(props) {
        super(props);
        this.state = {


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
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <Modal


                        dialogClassName="col-sm-12"
                        show={this.state.CongratulationModal}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >


                        <div className="  modal-body">



                            <div className="container">
                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 pt-4">
                                    <div className="row">
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 ">
                                            <img className="pointerr" src={BackArrow} onClick={() => this.handlecongratulationClosemodal()}></img>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6  text-right">
                                            <img className="pointerr" src={crossbtn} onClick={() => this.handlecongratulationClosemodal()}></img>
                                        </div>

                                    </div>

                                </div>
                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 text-center pb-4 mt-3 ">
                                    <img src={storytelling}></img>
                                    <p className="poppins_medium mt-4 congratulation_text"> Congratulation  </p>
                                    <p className="poppins_light mt-4 modal_text"> Your eBook is under review in order to track your book go to Manage Books  </p>

                                    <button className="col-xl-4 poppins_semibold modalbtn " onClick={() => this.onManageBook()}>Manage Books</button>

                                </div>




                            </div>



                        </div>


                    </Modal>



                    <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 managebookContainer">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 p-0">
                                <p className="poppins_semibold managebookheading">Allow Book</p>
                            </div>


                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="bookDescriptionCard">
                                    <p className="titleAllowBook">Users</p>
                                    <select className="col-md-6 managebookInput">
                                        <option>Please Select Users</option>
                                        <option value='English'>English</option>
                                        <option value='Urdu'>Urdu</option>


                                    </select>
                                    <p className=" titleAllowBook">Books</p>
                                    <select className="col-md-6 managebookInput">
                                        <option>Please Select Books</option>
                                        <option value='English'>English</option>
                                        <option value='Urdu'>Urdu</option>


                                    </select>


                                    <div className="text-right">
                                    <button className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6  poppins_semibold uploadbtn" >Allow Book</button>

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

ManageBook.propTypes = {

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
export default connect(mapStateToProps, mapDispatchToProps)(ManageBook);
