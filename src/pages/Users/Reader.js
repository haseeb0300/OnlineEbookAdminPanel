
import React, { Component } from 'react';

import { connect } from 'react-redux';
import profile from '../../assets/images/Users/profile.png'
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
import { getAllReader } from '../../store/actions/authActions';

import moment from 'moment'
import Moment from 'react-moment';
import { Link, withRouter } from 'react-router-dom';









var cx = require('classnames');





class Reader extends Component {
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
            readerList: [],
            readerListFiltered: [],
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
        this.setState({ isLoading: true })
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

        this.props.getAllReader().then((res) => {
            console.log(res.content)
            if (res.status == true) {
                this.setState({
                    readerList: res.content,
                    isLoading: false
                })

            }
            else {
                alert(res)
            }
        }).catch((err) => {
            console.log(err)

        })

    }

    onSearch =async (searchStr) =>{
        
        if(!searchStr){
            this.setState({readerListFiltered:[]})
return
        }
        let { readerList} =this.state
        console.log(readerList)
        let fiteredList = readerList.filter((item)=>{
            if( item.Full_Name.toLowerCase().includes(searchStr.toLowerCase()) || item.Email.toLowerCase().includes(searchStr.toLowerCase()))
            return true 
            return false
        })
        this.setState({
            currentPage:  1
        });
        console.log(fiteredList)
        this.setState({ readerListFiltered: fiteredList})
    }

    onPressSortByName = (colName, sort) => {

        return
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
            this.onSearch(e.target.value)
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

    onLibrary = (User_ID) => {

        this.props.history.push('/LibraryBooks', { 'User_ID': User_ID });
    }

    onClickBottomBar = (val) => {
        this.setState({
            activeTab: val
        })
    }
    handleClick = (type) => {
        if (type === 'next') {
            this.setState({
                currentPage: this.state.currentPage + 1
            });
        } else if (type === 'previous') {
            this.setState({
                currentPage: this.state.currentPage - 1
            });
        }

    }
    renderTableRows = (list) => {
        var myData = [];
        if (list && list.length < 1) {

            return () =>

                <tr>
                    <td class="text-center" colspan="7"> <b>  No Data To Display</b>

                    </td>
                </tr>

        }

        return list.map((item, i) =>

            <tr>




                <td>{item.Full_Name}</td>
                <td>{item.Email}</td>




                <td>
                    <img className="pointerr" src={visibility} onClick={() => this.onClickView(item)}></img>
                </td>
                <td>
                    {/* <Link to="/LibraryBooks" > */}
                    <p className="gotolibrary" onClick={() => this.onLibrary(item.User_ID)}>Go to library</p>
                    {/* </Link> */}
                </td>
            </tr>
        )



    }

     onSort = (name,order )=>{
         console.log("ORDER : " + order)
          
        this.setState({ ["SORT"+ name]:   order} )
        let { readerList,readerListFiltered } = this.state
        let readerListSorted = readerList.sort(this.sortArrByOrder (name,order))
        let readerListFilteredSorted = readerListFiltered.sort(this.sortArrByOrder (name,order))
        this.setState({readerList : readerListSorted ,readerListFiltered : readerListFilteredSorted   })
         
     }

      sortArrByOrder = (prop ,order)=> {    
          if(order ==="ASC")
        return function(a, b) {    
            if (a[prop] > b[prop]) {    
                return 1;    
            } else if (a[prop] < b[prop]) {    
                return -1;    
            }    
            return 0;    
        }    

        return function(a, b) {    
            if (a[prop]  < b[prop]) {    
                return 1;    
            } else if (a[prop]  > b[prop]) {    
                return -1;    
            }    
            return 0;    
        }    
    }  

    render() {

        const { isLoading, readerList,readerListFiltered ,currentPage, todosPerPage } = this.state;

        if (isLoading) {
            return (
                <div className="loader-large"></div>
            )
        }
        let printList = this.state.search  ? readerListFiltered:readerList
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentTodos =  printList.slice(indexOfFirstTodo, indexOfLastTodo);

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(printList.length / todosPerPage); i++) {
            pageNumbers.push(i);
        }

        return (
            <div>
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 managebookContainer">
                            <p className="poppins_semibold Allbook-heading-main">Users (Readers)</p>

                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 pt-3 AllbookContainer ">
                                <div className="row">
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 ">


                                        <p className="Allbook-heading mb-0">All Users</p>
                                        <p className="allbooktext mb-0">All readers on little book company</p>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12  ">
                                        <div className="row">
                                            <div className="col-xl-5 col-lg-5 col-md-5 col-sm-4 col-4 "></div>
                                            <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12 p-0 pr-4 text-right">
                                                <img className="searchicon" src={searchicon}></img>

                                                <input className="search_input " placeholder="search here" name="search" onChange={this.onChange}></input>
                                                <button className="allbook-search-btn" onClick={ ()=>this.onSearch(this.state.search)}>search</button>

                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 pt-3 AllbookContainer ">
                                <div className="table-responsive mt-4 checkout_container">
                                    <table className="table table-hover thead-primary">
                                        <thead>
                                            <tr>


                                                {this.state["SORT"+"Full_Name"] ==="DESC" ?  
                                                    <th onClick={(e) => this.onSort('Full_Name', 'ASC' )} scope="col table_header poppins_medium"> Name  <img className="dropicon" src={Polygon} ></img> </th>
                                                  : 
                                                    <th  onClick={(e) => this.onSort('Full_Name', 'DESC' )} scope="col table_header poppins_medium"> Name  <img className="dropicon" src={visibility}  ></img> </th>
                                                 }
                                                {this.state["SORT"+"Email"] ==="DESC" ?  (
                                                    <th scope="col table_header poppins_medium">Email <img className="dropicon" src={Polygon} onClick={() => this.onSort('Email', 'ASC')}></img> </th>
                                                ) : (
                                                    <th scope="col table_header poppins_medium">Email <img className="dropicon" src={visibility} onClick={() => this.onSort('Email', 'DESC')}></img> </th>
                                                )}
                                                <th scope="col table_header poppins_medium">View  </th>
                                                <th scope="col table_header poppins_medium">Actions  </th>


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

Reader.propTypes = {

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
    getAllReader,
})
export default connect(mapStateToProps, mapDispatchToProps)(Reader);
