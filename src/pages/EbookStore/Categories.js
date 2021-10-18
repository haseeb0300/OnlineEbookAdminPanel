
import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Dropdown, Modal, Form, DropdownButton } from 'react-bootstrap';
import { uploadEpub } from '../../store/actions/bookAction';
import searchicon from '../../assets/images/Managebooks/searchicon.svg'
import Polygon from '../../assets/images/Managebooks/Polygon.svg'
import closeImg from '../../assets/images/Managebooks/Modal/close.png'
import visibility from '../../assets/images/Managebooks/visibility.svg'
import { getAllBooks, sortAllBooks, searchBook, createBook, getBookCategory, getBookParentCategory, createCategory } from '../../store/actions/bookAction';
import moment from 'moment'
import Moment from 'react-moment';
import plus from '../../assets/images/Managebooks/plus.png'
import FadeLoader from "react-spinners/FadeLoader";
import { css } from "@emotion/react";


const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;





var cx = require('classnames');





class Categories extends Component {
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
            CtaegoryList: [],
            ParentCtaegoryList: [],
            Category_ID: '',
            P_Category_ID: '',
            Category_Name: '',
            onTableLoad: false,
            currentPage: 1,
            todosPerPage: 15,


        };
        this.handleChange = this.handleChange.bind(this);

    }

    componentDidUpdate(prevProps, prevState, snapshot) {


    }

    componentWillMount() {
        if (this.props != null && this.props.location.state != null && this.props.location.state.book) {


            //console.log(this.props.location.state.book)
            this.setState({
                newBoolList: this.props.location.state.book

            })
        }

    }

    handleClick = (type) => {
        if(type === 'next'){
            this.setState({
                currentPage: this.state.currentPage + 1
            });
        }else if (type === 'previous')
        {
            this.setState({
                currentPage: this.state.currentPage - 1
            });
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

    

    // filterList = () => {

    //     var newArray = this.state.CtaegoryList.filter(function (el) {
    //         return el.price <= 1000 &&
    //                el.sqft >= 500 &&
    //                el.num_of_beds >=2 &&
    //                el.num_of_baths >= 2.5;
    //       });
    // }

    onClickView = (book) => {
        this.props.history.push('/addnewbook', { book: book })
    }

    componentDidMount() {
        this.setState({ onTableLoad: true })
        this.props.getBookParentCategory().then((res) => {
            console.log(res)
            this.setState({
                ParentCtaegoryList: res.content,
            })

        }).catch((err) => {
            console.log(err)

        })
        this.props.getBookCategory().then((res) => {
            console.log(res)
            this.setState({
                CtaegoryList: res.content,
                onTableLoad: false
            })

        }).catch((err) => {
            console.log(err)

        })

        this.props.getAllBooks().then((res) => {
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
            //this.onClickSearch()
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

    renderTableRows = (list) => {
        var myData = [];
        // if (this.state.CtaegoryList?.length < 1) {

        //     return () =>

        //         <tr>
        //             {/* <td class="text-center" colspan="7"> <b>  No Data To Display</b>

        //             </td> */}
        //             {this.state.onTableLoad && <FadeLoader color={"#38A3A5"} loading={true} css={override} size={150}></FadeLoader>}

        //         </tr>

        // }
        if (list?.length > 0) {
            return list.map((item, i) =>

                <tr>
                    {/* <td>
        <div class="form-group">
            <input type="checkbox" id="html1" />
            <label for="html1"></label>
        </div>
    </td>
    <td>03241</td> */}

                    <td>{i + 1}</td>

                    <td>{item.Category_Name}</td>
                    {/* <td>{item.Author_Name}</td>
                    <td><Moment format="DD-MM-YY HH:MM">{item.createdAt}</Moment></td>
                    <td>
                        <div class={item.Status == 'Published' ? "table-badge-publish" : item.Status == 'On Review' ? "table-badge-review" : item.Status == "UnPublished" ? 'table-badge-unpublish' : "table-badge-blocked"}>
                            <label className="badge-label">
                                {item.Status}
                            </label>
                        </div>
                    </td>

                    <td>
                        <label class="blackSwitch">
                            <input type="checkbox" checked={item.Active_Status} />
                            <span class="blackslider round"></span>
                        </label>
                    </td>
                    <td>
                        <img className="pointerr" src={visibility} onClick={() => this.onClickView(item)}></img>
                    </td> */}
                </tr>
            )
        } else {
            return list.map((item, i) =>

                <tr>
                    {/* <td>
                <div class="form-group">
                    <input type="checkbox" id="html1" />
                    <label for="html1"></label>
                </div>
            </td>
            <td>03241</td> */}

                    <td><img src={item.Image} width="50px"></img></td>

                    <td>{item.Name}</td>
                    <td>{item.Author_Name}</td>


                    <td>
                        <label class="blackSwitch">
                            <input type="checkbox" checked={item.Active_Status} name="Active_Status" onChange={() => {
                                var addBookData = {
                                    "Name": item.Name,
                                    "Language": item.Language,
                                    //"Age_Group": item.Age_Group,
                                    "Author_Image": item.Author_Image,
                                    "Author_Name": item.Author_Name,
                                    "Author_Description": item.Author_Description,
                                    "Description": item.Description,
                                    "Category_ID": item.Category_ID,
                                    "Publisher_Name": item.Publisher_Name,
                                    "Author_Email": item.Author_Email,
                                    "Url": item.Url,
                                    "Active_Status": !item.Active_Status,
                                    "Book_ID": item.Book_ID,
                                }
                                this.props.createBook(addBookData).then((res) => {
                                    console.log(res)
                                    if (res.status) {
                                        this.setState(({ bookList }) => ({


                                            bookList: [
                                                ...bookList.slice(0, i),
                                                {
                                                    ...bookList[i],
                                                    Active_Status: !item.Active_Status,
                                                },
                                                ...bookList.slice(i + 1)
                                            ]
                                        }));
                                    }
                                }).catch((err) => {

                                    var validationError = {}
                                    var serverError = []
                                    console.log(err.hasOwnProperty('validation'))

                                    if (err.hasOwnProperty('validation')) {
                                        console.log(err)

                                        err.validation.map(obj => {
                                            if (obj.hasOwnProperty('param')) {
                                                validationError[obj["param"]] = obj["msg"]
                                            } else {
                                                serverError = [...serverError, obj]
                                            }
                                            console.log(obj["msg"])
                                        });
                                        this.setState({ errors: validationError });
                                        this.setState({ serverError: serverError });
                                    } else {
                                        this.setState({ serverError: [{ "msg": "server not responding" }] })
                                    }
                                });



                            }} />
                            <span class="blackslider round"></span>
                        </label>
                    </td>
                    <td>
                        <img className="pointerr" src={visibility} onClick={() => this.onClickView(item)}></img>
                    </td>
                </tr>
            )
        }


    }

    onCreateCategory = () => {
        this.setState({ errors: {}, serverError: {}, isLoading: true })
        var categoryData = {
            "Category_ID": this.state.CtaegoryList.length + 1,
            "Category_Name": this.state.Category_Name,

        }
        this.props.createCategory(categoryData).then((res) => {
            //console.log(res)

            if (res.status) {
                this.props.getBookCategory().then((res) => {
                    console.log(res)
                    this.setState({
                        CtaegoryList: res.content,
                        CategoryModal: false,
                        isLoading: false,
                    })

                }).catch((err) => {
                    console.log(err)

                })
            }

        }).catch((err) => {
            var validationError = {}
            var serverError = []
            this.setState({ isLoading: false, })
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

        const { isLoading, CtaegoryList, currentPage, todosPerPage } = this.state;

        if (isLoading) {
            return (
                <div className="loader-large"></div>
            )
        }

        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentTodos = CtaegoryList.slice(indexOfFirstTodo, indexOfLastTodo);

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(CtaegoryList.length / todosPerPage); i++) {
            pageNumbers.push(i);
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
                                        <input className="ModalInput col-4 " disabled={true} value={this.state.CtaegoryList.length + 1}></input>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 mt-4">
                                <div className="row">
                                    <div className="col-3 Vertical_center text-right">
                                        <p className="poppins_medium Modaltext mb-0">Category Name</p>
                                    </div>
                                    <div className="col-9 ">
                                        <input className="ModalInput col-7 " name="Category_Name" onChange={this.onChange} value={this.state.Category_Name}></input> <br></br>


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
                                {/* <div className="row">
                                    <div className="col-3 Vertical_center text-right">
                                        <p className="poppins_medium Modaltext mb-0">Sub Category</p>
                                    </div>
                                    <div className="col-9 ">
                                        <input className="ModalInput col-7 "></input> <br></br>


                                    </div>
                                </div> */}
                            </div>

                            <div className="col-12 mt-5">
                                {/* <div className="row">
                                    <div className="col-3 Vertical_center text-right">
                                        <p className="poppins_medium Modaltext mb-0">Status</p>
                                    </div>
                                    <div className="col-9 checkout_container ">
                                        <label class="blackSwitch">
                                            <input type="checkbox" />
                                            <span class="blackslider round"></span>
                                        </label>

                                    </div>
                                </div> */}
                            </div>
                            <div className="col-12 text-center mt-5">
                                <p className="poppins_medium DeleteText">Delete this Category</p>

                            </div>
                            <div className="col-12 text-center">
                                <button className="mdlBtn col-5 poppins_semibold" onClick={this.onCreateCategory}>Save Changes</button>
                            </div>
                        </div>

                    </div>


                </Modal>

                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 managebookContainer">
                            <p className="poppins_semibold Allbook-heading-main">Categories</p>

                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 pt-4 pl-4 pr-4 AllbookContainer ">
                                <div className="row">
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 ">
                                        <div className="row">

                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12  ">
                                                <p className="Allbook-heading mb-0">All Categories</p>
                                                <p className="allbooktext mb-0">All your categories.</p>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12  ">
                                                <select className="managebookInput" name="P_Category_ID" onChange={this.onChange} value={this.state.P_Category_ID}>
                                                    <option value={-1} disable selected={!this.state.P_Category_ID}  >--Please Select--</option>

                                                    {this.state.ParentCtaegoryList.map((item, index) =>
                                                        <option value={item.Category_ID} selected={item.Category_ID && this.state.P_Category_ID == item.P_Category_ID}>{item.Category_Name}</option>

                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12  ">
                                        <div className="row">
                                            <div className="col-12 text-right mt-1 ">
                                                <img className="ml-3 mr-1 imgHover " onClick={() => this.setState({ CategoryModal: true })} src={plus} /> <label className="poppins_regular AddModalText" onClick={() => this.setState({ CategoryModal: true })}>Add Category</label>
                                            </div>
                                            {/* <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12 p-0 pr-4 text-right">
                                                <img className="searchicon" src={searchicon}></img>

                                                <input className="search_input " placeholder="search here" name="search" onChange={this.onChange}></input>
                                                <button className="allbook-search-btn">search</button>

                                            </div> */}

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 pt-3 AllbookContainer ">
                                <div className="table-responsive mt-4 checkout_container">
                                    <table className="table table-hover thead-primary">
                                        <thead>
                                            <tr>
                                                {/* <th scope="col">
                                                    <div class="form-group">
                                                        <input type="checkbox" id="html1" />
                                                        <label for="html1"></label>
                                                    </div>
                                                </th>
                                                <th scope="col table_header poppins_medium">Book ID <img className="dropicon" src={Polygon}></img> </th> */}

                                                <th scope="col table_header poppins_medium">ID   </th>
                                                {this.state.sortByName ? (
                                                    <th scope="col table_header poppins_medium">Category Name  <img className="dropicon" src={Polygon} onClick={() => this.onPressSortByName('Name', 'ASC')}></img> </th>
                                                ) : (
                                                    <th scope="col table_header poppins_medium">Category Name  <img className="dropicon" src={Polygon} onClick={() => this.onPressSortByName('Name', 'DESC')}></img> </th>
                                                )}
                                                {/* {this.state.sortByAuthorName ? (
                                                    <th scope="col table_header poppins_medium">Sub category <img className="dropicon" src={Polygon} onClick={() => this.onPressSortByName('Author_Name', 'ASC')}></img> </th>
                                                ) : (
                                                    <th scope="col table_header poppins_medium">Sub category <img className="dropicon" src={Polygon} onClick={() => this.onPressSortByName('Author_Name', 'DESC')}></img> </th>
                                                )}

                                                <th scope="col table_header poppins_medium"> Status   </th>
                                                <th scope="col table_header poppins_medium">View  </th> */}


                                            </tr>
                                        </thead>
                                        <tbody>


                                            {this.state.bookList.length > 0 && this.renderTableRows(currentTodos)}
                                            {this.state.bookList?.length < 1 &&
                                                <tr>
                                                    <td class="text-center" colspan="7"> <b>  No Data To Display</b>

                                                    </td>

                                                </tr>
                                            }



                                        </tbody>

                                    </table>



                                </div>
                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12  ">
                                    <div className="row">

                                        <div className=" col-12  text-center">
                                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12  pb-3">

                                                <div className="row">
                                                    <div className="col-xl-3 col-lg-2 col-md-2 col-sm-2 col-2 ">


                                                        <button className="navbtn" onClick={(e) => this.handleClick('previous')} disabled={currentPage === 1 ? true : false}>← Previous</button>
                                                    </div>
                                                    <div className="col-xl-6 col-lg-8 col-md-8 col-sm-8 col-8  pb-3">

                                                        {/* <button className="roundbtn">1</button>
                                                        <button className="roundbtn"> 2</button>
                                                        <button className="roundbtn">3</button>
                                                        <button className="roundbtn">4</button>
                                                        <button className="roundbtn">5</button> */}
                                                        {/* <p className="allbooktext mb-0">{this.state.currentPage + '/' + pageNumbers.length}</p> */}
                                                        <label className="poppins_bold">{this.state.currentPage}</label>
                                                        <label className="poppins_regular ml-3 mr-3">out of</label>
                                                        <label className="poppins_bold">{pageNumbers.length}</label>

                                                    </div>
                                                    <div className="col-xl-3 col-lg-2 col-md-2 col-sm-2 col-2 ">

                                                        <button className="navbtn" onClick={(e) => this.handleClick('next')} disabled={this.state.currentPage === pageNumbers.length ? true : false}>Next →</button>
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




            </div>

        )
    }

}

Categories.propTypes = {

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
    getBookCategory,
    getBookParentCategory,
    createCategory,
})
export default connect(mapStateToProps, mapDispatchToProps)(Categories);
