
import React, { Component } from 'react';

import { connect } from 'react-redux';
import progressicon from '../../assets/images/progressIcon.png'
import epubuploadicon from '../../assets/images/epubupload.svg'
import { Dropdown, Modal, Form, DropdownButton } from 'react-bootstrap';
import crossbtn from '../../assets/images/CongratulationModal/crossBtn.svg';
import BackArrow from '../../assets/images/CongratulationModal/back-arrow.svg';
import storytelling from '../../assets/images/CongratulationModal/storytelling.svg';
import { uploadEpub } from '../../store/actions/bookAction';
import searchicon from '../../assets/images/NoFile.png'
import Polygon from '../../assets/images/Managebooks/Polygon.svg'
import tableBook from '../../assets/images/Managebooks/tableBook.svg'
import visibility from '../../assets/images/Managebooks/visibility.svg'
import { getAllBooks, sortAllBooks, searchBook,createBook,getReaderBook } from '../../store/actions/bookAction';
import moment from 'moment'
import Moment from 'react-moment';









var cx = require('classnames');





class ManageBook extends Component {
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
            bookList: [],
            newBoolList: [],
            search: '',
            Active_Status:false,
            User_ID: '',
            deleteModal: false,


        };
        this.handleChange = this.handleChange.bind(this);

    }

    componentDidUpdate(prevProps, prevState, snapshot) {


    }

    componentWillMount() {
        if (this.props != null && this.props.location.state != null && this.props.location.state.User_ID) {


            //console.log(this.props.location.state.book)
            this.setState({
                User_ID: this.props.location.state.User_ID

            })
        }

    }

    onFileChange(event) {

        event.preventDefault();

        let reader = new FileReader();
        let file = event.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                //epub: reader.result
            }, () => {
                this.uploadEpub();
            });

        }
        reader.readAsDataURL(file)
    }
    uploadEpub() {
        const payload = new FormData();
        //payload.append('imageType', 'RESTAURENT_OWNER')
        payload.append('book', this.state.file);
        this.setState({ isUploading: true })
        this.props.uploadEpub(payload).then((res) => {
            console.log(res.content)
            this.setState({ isUploading: false })
            if (res.content.length > 0) {
                console.log(res.content[0].url)
                this.setState({ book_url: res.content[0].url, original_book_name: res.content[0].originalname })
            }
        }).catch((err) => {
            this.setState({ isUploading: false })

        })

    }

    onClickView = (book) => {
        this.props.history.push('/addnewbook', { book: book })
    }

    componentDidMount() {
        this.props.getReaderBook(this?.props?.location?.state?.User_ID).then((res) => {
            console.log(res.content[0]?.library_has_books)
            if (res.status == true) {
                this.setState({
                    bookList: res?.content[0]?.library_has_books,
                })

            }
            else {
                alert(res)
            }
        }).catch((err) => {
            console.log(err)

        })

    }


    onPressSortByName = (colName, sort) => {

        this.props.sortAllBooks(colName, sort).then((res) => {
            console.log(res.content)
            if (res.status == true) {
                if (colName == "Author_Name") {
                    this.setState({
                        bookList: res.content,
                        sortByAuthorName: !this.state.sortByAuthorName
                    })
                } else if (colName == "createdAt") {
                    this.setState({
                        bookList: res.content,
                        sortByDate: !this.state.sortByDate
                    })
                } else if (colName == "Name") {
                    this.setState({
                        bookList: res.content,
                        sortByName: !this.state.sortByName
                    })
                } else if (colName == "Status") {
                    this.setState({
                        bookList: res.content,
                        sortByStatus: !this.state.sortByStatus
                    })
                }

            }
            else {
                alert(res)
            }
        }).catch((err) => {
            console.log(err)

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

        this.setState({ [e.target.name]: e.target.value }, () => {
            this.onClickSearch()
        })
    }

    onClickSearch = () => {
        this.props.searchBook(this.state.search).then((res) => {
            console.log(res.content)
            if (res.status == true) {
                this.setState({
                    bookList: res.content,
                })


            }
            else {
                alert(res)
            }
        }).catch((err) => {
            console.log(err)

        })

    }

    onClickBottomBar = (val) => {
        this.setState({
            activeTab: val
        })
    }

    renderTableRows = () => {
            return this.state.bookList.map((item, i) =>

                <tr>
                    <td><img src={item?.book?.Image} width="50px"></img></td>
                    <td>{item?.book?.Name}</td>
                    <td>{item?.book?.Author_Name}</td>
                </tr>
            )
    }

     renderBooks = () => {
        if (!this.state.isLoading && this.state.bookList?.length < 1) {

            return <div className="nofile w-100">
                <div className="text-center mt-5 pt-5">
                    {/* <img src={NoFile} /> */}
                    <p className="poppins_bold text-center SorryTextM mb-0">NO E-Book Found</p>
                    <p className="poppins_bold text-center SorryTextS mb-0 " >Tweak some filters and check other categories to find more E-books</p>
                </div>

            </div>
        }
        return this.state.bookList.map((item, i) =>

            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-4 col-6  pt-3 pb-5 mt-3 mb-b  text-center" >

                <img className="libBookImg w-100"
                 src={this.state.isImageLoaded ? item.book?.Image : item.book?.Image}
                 onLoad={() => this.setState({ isImageLoaded: true })}
                 ></img> <br></br>

                <label className=" cut-text poppins-medium book-title mt-3" >{item.book?.Name}</label><br></br>
                <label className=" cut-text book-author poppins_light" >{"by " + item.book?.Author_Name}</label><br></br>
                <label className="  DeleteText poppins_light" onClick={() => this.setState({ deleteModal: true })} >Delete from library</label><br></br>

            
            </div>
        )
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
                <div className="deleteModal">
                    <Modal


                        dialogClassName="col-sm-12 "
                        show={this.state.deleteModal}
                        size="md"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >


                        <div className="  modal-body text-center deleteModal">
                            <div className="container-fluid ModalContainer">
                                <div className="col-12">
                                    <div className="row">
                                        <div className="col-12">
                                            <p className="poppins_medium ModalHading">Are You Sure You Want To Delete?</p>
                                        </div>
                                        <div className="col-12 mt-4">
                                            <div className="row">
                                                <div className="col-6 text-center">
                                                    <button className="deleteModalCancelbtn" onClick={() => this.setState({ deleteModal: false })}>Cancel</button>
                                                </div>
                                                <div className="col-6 text-center">
                                                    <button className="deleteModalYesbtn" >Delete</button>


                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>


                            </div>

                        </div>


                    </Modal>
                </div>
                    <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 managebookContainer">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 pt-3 AllbookContainer ">
                                <div className="row">
                                   
                                    {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12  ">
                                        <div className="row">
                                            <div className="col-xl-5 col-lg-5 col-md-5 col-sm-4 col-4 "></div>
                                            <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12 p-0 pr-4 text-right">
                                                <img className="searchicon" src={searchicon}></img>

                                                <input className="search_input " placeholder="search here" name="search" onChange={this.onChange}></input>
                                                <button className="allbook-search-btn">search</button>

                                            </div>

                                        </div>
                                    </div> */}
                                </div>
                            </div>

                            {/* <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 pt-3 AllbookContainer ">
                                <div className="table-responsive mt-4 checkout_container">
                                    <table className="table table-hover thead-primary">
                                        <thead>
                                            <tr>
                                           
                                                <th scope="col table_header poppins_medium">Book Title   </th>
                                                {this.state.sortByName ? (
                                                    <th scope="col table_header poppins_medium">Book Name  <img className="dropicon" src={Polygon} onClick={() => this.onPressSortByName('Name', 'ASC')}></img> </th>
                                                ) : (
                                                        <th scope="col table_header poppins_medium">Book Name  <img className="dropicon" src={Polygon} onClick={() => this.onPressSortByName('Name', 'DESC')}></img> </th>
                                                    )}
                                                {this.state.sortByAuthorName ? (
                                                    <th scope="col table_header poppins_medium">Author Name <img className="dropicon" src={Polygon} onClick={() => this.onPressSortByName('Author_Name', 'ASC')}></img> </th>
                                                ) : (
                                                        <th scope="col table_header poppins_medium">Author Name <img className="dropicon" src={Polygon} onClick={() => this.onPressSortByName('Author_Name', 'DESC')}></img> </th>
                                                    )}
                               


                                            </tr>
                                        </thead>
                                        <tbody>
                              
                                            {this?.state?.bookList?.length > 0 && this.renderTableRows()}
                                            {this?.state?.bookList?.length < 1 &&
                                                <tr>
                                                    <td className="text-center" colspan="7"> <b>  No Data To Display</b>

                                                    </td>

                                                </tr>
                                            }



                                        </tbody>

                                    </table>

                                </div>
                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12  ">
                                    <div className="row">
                                        <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3  ">
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12  text-center">
                                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12  pb-3">

                                                <div className="row">
                                                    <div className="col-xl-3 col-lg-2 col-md-2 col-sm-2 col-2 ">


                                                        <button className="navbtn">← Previous</button>
                                                    </div>
                                                    <div className="col-xl-6 col-lg-8 col-md-8 col-sm-8 col-8  pb-3">

                                                        <button className="roundbtn">1</button>
                                                        <button className="roundbtn"> 2</button>
                                                        <button className="roundbtn">3</button>
                                                        <button className="roundbtn">4</button>
                                                        <button className="roundbtn">5</button>
                                                    </div>
                                                    <div className="col-xl-3 col-lg-2 col-md-2 col-sm-2 col-2 ">

                                                        <button className="navbtn">Next →</button>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>


                                    </div>

                                </div>

                            </div> */}
                            <div className="col-12 libarayContainer">
                            <p className="Allbook-heading mb-0">BookShelf</p>
                                        <p className="allbooktext mb-0">All your books in library </p>
                                   
                                <div className="row">
                               
                                {this.state.bookList && this.renderBooks()}

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
    getReaderBook,
})
export default connect(mapStateToProps, mapDispatchToProps)(ManageBook);
