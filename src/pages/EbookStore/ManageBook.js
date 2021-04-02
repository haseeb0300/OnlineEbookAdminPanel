
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
import { getAllBooks, sortAllBooks, searchBook,createBook } from '../../store/actions/bookAction';
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
            bookList: {},
            newBoolList: [],
            search: '',
            Active_Status:false,

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
        var myData = [];
        if (this.state.bookList && this.state.bookList.length < 1) {

            return () =>

                <tr>
                    <td class="text-center" colspan="7"> <b>  No Data To Display</b>

                    </td>
                </tr>

        }
        if (this.state.newBoolList?.length > 0) {
            return this.state.newBoolList.map((item, i) =>

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
                    </td>
                </tr>
            )
        } else {
            return this.state.bookList.map((item, i) =>

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
                    <td><Moment format="DD-MM-YY HH:MM">{item.createdAt}</Moment></td>
                    <td>
                        {/* <div class={item.Status == 'Published'? "table-badge-publish": item.Status == 'On Review'?"table-badge-review": item.Status == "UnPublished"?'table-badge-unpublish':"table-badge-blocked"}>
                            <label className="badge-label">
                                {item.Status}
                            </label>
                        </div> */}
                        <select   value={item.Status}
                        className={cx("tableSelect_Review",
                         {["tableSelect_Published"] :item.Status ==="Published",
                         ["tableSelect_Unpublished"] :item.Status ==="UnPublished",
                         ["tableSelect_Blocked"] :item.Status ==="Blocked",
                         
                        })} onChange={(e) => {
                            console.log(e.target.value)
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
                                "Status": e.target.value,
                                "Book_ID": item.Book_ID,
                            }
                            console.log(addBookData)
                            const status = e.target.value 
                            const index = i
                            this.props.createBook(addBookData).then((res) => {
                                console.log(res)
                                if (res.status) {
                                    this.setState(({ bookList }) => ({
                                        bookList: [
                                            ...bookList.slice(0, index),
                                            {
                                                ...bookList[index],
                                                Status: status,
                                            },
                                            ...bookList.slice(index + 1)
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

                            //
                          
                        }} >
                            <option value="On Review">On Review</option>
                            <option value="Published">Published</option>
                            <option value="UnPublished">UnPublished</option>
                            <option value="Blocked">Blocked</option>



                        </select>
                       
                        {/* tableSelect_Review
tableSelect_Published
tableSelect_Unpublished
tableSelect_Blocked */}





                    </td>


                    <td>
                        <label class="blackSwitch">
                            <input type="checkbox" checked={item.Active_Status} name="Active_Status" onChange={ ()=>{
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
                       
                   
                       
                            }}/>
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
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 pt-3 AllbookContainer ">
                                <div className="row">
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 ">


                                        <p className="Allbook-heading mb-0">All Books</p>
                                        <p className="allbooktext mb-0">All your books that are Published and under review</p>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12  ">
                                        <div className="row">
                                            <div className="col-xl-5 col-lg-5 col-md-5 col-sm-4 col-4 "></div>
                                            <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12 p-0 pr-4 text-right">
                                                <img className="searchicon" src={searchicon}></img>

                                                <input className="search_input " placeholder="search here" name="search" onChange={this.onChange}></input>
                                                <button className="allbook-search-btn">search</button>

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
                                                {/* <th scope="col">
                                                    <div class="form-group">
                                                        <input type="checkbox" id="html1" />
                                                        <label for="html1"></label>
                                                    </div>
                                                </th>
                                                <th scope="col table_header poppins_medium">Book ID <img className="dropicon" src={Polygon}></img> </th> */}

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
                                                {this.state.sortByDate ? (
                                                    <th scope="col table_header poppins_medium">Date & Time <img className="dropicon" src={Polygon} onClick={() => this.onPressSortByName('createdAt', 'ASC')}></img>  </th>
                                                ) : (
                                                        <th scope="col table_header poppins_medium">Date & Time <img className="dropicon" src={Polygon} onClick={() => this.onPressSortByName('createdAt', 'DESC')}></img>  </th>
                                                    )}
                                                {this.state.sortByStatus ? (
                                                    <th scope="col table_header poppins_medium">Status  <img className="dropicon" src={Polygon} onClick={() => this.onPressSortByName('Status', 'ASC')}></img> </th>
                                                ) : (
                                                        <th scope="col table_header poppins_medium">Status  <img className="dropicon" src={Polygon} onClick={() => this.onPressSortByName('Status', 'DESC')}></img> </th>

                                                    )}
                                                <th scope="col table_header poppins_medium">Active Status   </th>
                                                <th scope="col table_header poppins_medium">View  </th>


                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* <tr> 
                                            <td>
                                                <div class="form-group">
                                                    <input type="checkbox" id="html1" />
                                                    <label for="html1"></label>
                                                </div>
                                            </td>
                                            <td>03241</td>

                                            <td><img src={tableBook}></img></td>

                                            <td>Mashk-e-Sukhan</td>
                                            <td>Saiyid Ali Naqvi</td>
                                            <td>29-12-2020, 16:34</td>
                                            <td>
                                                <div class="table-badge-review">
                                                    <label className="badge-label">
                                                        On Review
                                        </label>
                                                </div>
                                            </td>

                                            <td>
                                                <label class="blackSwitch">
                                                    <input type="checkbox" />
                                                    <span class="blackslider round"></span>
                                                </label>
                                            </td>
                                            <td>
                                                <img src={visibility}></img>
                                            </td>
                                            </tr>

                                            <tr> 
                                            <td>
                                                <div class="form-group">
                                                    <input type="checkbox" id="html1" />
                                                    <label for="html1"></label>
                                                </div>
                                            </td>
                                            <td>03241</td>

                                            <td><img src={tableBook}></img></td>

                                            <td>Mashk-e-Sukhan</td>
                                            <td>Saiyid Ali Naqvi</td>
                                            <td>29-12-2020, 16:34</td>
                                            <td>
                                                <div class="table-badge-publish">
                                                    <label className="badge-label" checked>
                                                    Published                                        </label>
                                                </div>
                                            </td>

                                            <td>
                                                <label class="blackSwitch">
                                                    <input type="checkbox" />
                                                    <span class="blackslider round"></span>
                                                </label>
                                            </td>
                                            <td>
                                                <img src={visibility}></img>
                                            </td>
                                            </tr>
                                            <tr> 
                                            <td>
                                                <div class="form-group">
                                                    <input type="checkbox" id="html1" />
                                                    <label for="html1"></label>
                                                </div>
                                            </td>
                                            <td>03241</td>

                                            <td><img src={tableBook}></img></td>

                                            <td>Mashk-e-Sukhan</td>
                                            <td>Saiyid Ali Naqvi</td>
                                            <td>29-12-2020, 16:34</td>
                                            <td>
                                                <div class="table-badge-unpublish">
                                                    <label className="badge-label">
                                                    UnPublish
                                        </label>
                                                </div>
                                            </td>

                                            <td>
                                                <label class="blackSwitch">
                                                    <input type="checkbox" />
                                                    <span class="blackslider round"></span>
                                                </label>
                                            </td>
                                            <td>
                                                <img src={visibility}></img>
                                            </td>
                                            </tr>
                                            <tr> 
                                            <td>
                                                <div class="form-group">
                                                    <input type="checkbox" id="html1" />
                                                    <label for="html1"></label>
                                                </div>
                                            </td>
                                            <td>03241</td>

                                            <td><img src={tableBook}></img></td>

                                            <td>Mashk-e-Sukhan</td>
                                            <td>Saiyid Ali Naqvi</td>
                                            <td>29-12-2020, 16:34</td>
                                            <td>
                                                <div class="table-badge-blocked">
                                                    <label className="badge-label">
                                                    Blocked
                                        </label>
                                                </div>
                                            </td>

                                            <td>
                                                <label class="blackSwitch">
                                                    <input type="checkbox" />
                                                    <span class="blackslider round"></span>
                                                </label>
                                            </td>
                                            <td>
                                                <img src={visibility}></img>
                                            </td>
                                            </tr> */}

                                            {this.state.bookList.length > 0 && this.renderTableRows()}
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
