
import React, { Component } from 'react';

import { connect } from 'react-redux';

import searchicon from '../../assets/images/Managebooks/searchicon.svg'
import Polygon from '../../assets/images/Managebooks/Polygon.svg'
import tableBook from '../../assets/images/Managebooks/tableBook.svg'
import plus from '../../assets/images/Managebooks/plus.png'
import printIcon from '../../assets/images/Managebooks/print.png'

import { Dropdown, Modal, Form, DropdownButton } from 'react-bootstrap';

import moment from 'moment'
import Moment from 'react-moment';
import CloseIcon from '../../assets/images/purchasehistory/PrintModal/close.png'
import PlaceHolder from '../../assets/images/purchasehistory/PlaceHolder.png'


import { getAllOrders, sortOrderByBook, sortOrderByOrder, searchBook, getTotalEarning, getTotalPending, createPaymentOfOrder } from '../../store/actions/orderAction';




var cx = require('classnames');





class SellingHistoryAll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderList: [],
            errors: [],
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
            author: {},
            Reference_No: "",
            Status: "",
            Amount: "",
            index: {},
            currentPage: 1,
            todosPerPage: 15,
            isUploading: false,
            OrderListFiltered: [],




        };
        this.handleChange = this.handleChange.bind(this);

    }

    componentDidUpdate(prevProps, prevState, snapshot) {


    }


    componentWillMount() {
        if (this?.props?.location?.state?.user) {
            console.log("User :", this?.props?.location?.state?.user)

            this.props.getAllOrder(this?.props?.location?.state?.user?.User_ID).then((res) => {
                console.log("OrderList :", res.content)
                if (res.status) {
                    this.setState({
                        orderList: res.content,
                    })

                }
                else {
                    alert(res)
                }
            }).catch((err) => {
                console.log(err)

            })

            this.props.getTotalEarning(300).then((res) => {
                console.log("Total Earnings", res.content)
                if (res.status) {
                    this.setState({
                        totalearning: res.content[0]?.order_book?.total_amount,
                    })

                }
                else {
                    alert(res)
                }
            }).catch((err) => {
                console.log(err)

            })

            this.props.getTotalPending(7).then((res) => {
                console.log(res.content)
                if (res.status) {
                    this.setState({
                        pendingTotal: res.content[0]?.book?.total_amount,
                    })

                }
                else {
                    alert(res)
                }
            }).catch((err) => {
                console.log(err)

            })

            this.setState({
                author: this.props.location.state.user

            })
        }

    }


    componentDidMount() {
        this.props.getAllOrders('1').then((res) => {
            console.log(res.content)
            if (res.status) {
                this.setState({
                    orderList: res.content,
                })

            }
            else {
                alert(res)
            }
        }).catch((err) => {
            console.log(err)

        })
        this.props.getTotalEarning(300).then((res) => {
            console.log("Total Earnings", res.content)
            if (res.status) {
                this.setState({
                    totalearning: res.content[0]?.order_book?.total_amount,
                })

            }
            else {
                alert(res)
            }
        }).catch((err) => {
            console.log(err)

        })

    }

    onPayment = (item) => {
        var addBookData = {
            "Order_ID": item?.Order_ID,
            "Book_ID": item?.Book_ID,
            "Status": this.state.Status,
            "Reference_No": this.state.Reference_No,
            "Amount": this.state.Amount,
        }
        // this.setState({ isLoading: true })
        // var msg = "Succsessfully Add item";
        // if (this.state.item_id != null) {
        //   msg = "Succsessfully Update item";
        // }
        this.setState({ isUploading: true })

        this.props.createPaymentOfOrder(addBookData).then((res) => {
            console.log(res)
            if (res.status) {

                console.log(res)

                // this.setState({
                //     Book_ID: res.content[0] && res.content[0].Book && res.content[0].Book.Book_ID,
                //     activeTab: this.state.activeTab + 1,
                // })
                //this.props.history.push('/trackmyrecord');

                this.props.getAllOrders ('1').then((res) => {

                    if (res.status) {

                        this.setState({
                            orderList: res.content,
                            ReferenceModal: false,
                            isUploading:false
                        })

                    }
                    else {
                        alert(res)
                    }

                }).catch((err) => {
                    
                    console.log(err)

                })
            }
        }).catch((err) => {
            var validationError = []
            var serverError = []
            this.setState({ isUploading: false })

            console.log(err.hasOwnProperty('validation'))
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

    onPressSortByBook = (colName, sort) => {

        this.props.sortOrderByBook(colName, sort).then((res) => {
            console.log(res.content)
            if (res.status == true) {

                if (colName == "Name") {
                    this.setState({
                        orderList: res.content,
                        sortByName: !this.state.sortByName
                    })
                } else if (colName == "Price") {
                    this.setState({
                        orderList: res.content,
                        sortByPrice: !this.state.sortByPrice
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

    onPressSortByOrder = (colName, sort) => {

        this.props.sortOrderByOrder(colName, sort).then((res) => {
            console.log(res.content)
            if (res.status == true) {
                if (colName == "createdAt") {
                    this.setState({
                        orderList: res.content,
                        sortByDate: !this.state.sortByDate
                    })
                } else if (colName == "Reference_No") {
                    this.setState({
                        orderList: res.content,
                        sortByReference: !this.state.sortByReference
                    })
                } else if (colName == "Payment_Status") {
                    this.setState({
                        orderList: res.content,
                        sortByStatus: !this.state.sortByStatus
                    })
                }

                // if (colName == "Name") {
                //     this.setState({
                //         orderList: res.content,
                //         sortByName: !this.state.sortByName
                //     })
                // }

            }
            else {
                alert(res)
            }
        }).catch((err) => {
            console.log(err)

        })

    }

    onSelectChange = (e, type) => {
        this.setState({ [e.target.name]: e.target.value }, () => {
            if (type == 'Earning') {
                this.props.getTotalEarning(this.state.dayEarning).then((res) => {
                    console.log(res.content)
                    if (res.status) {
                        this.setState({
                            totalearning: res.content[0]?.book?.total_amount,
                        })

                    }
                    else {
                        alert(res)
                    }
                }).catch((err) => {
                    console.log(err)

                })
            } else if (type == 'Pending') {
                this.props.getTotalPending(this.state.dayPending).then((res) => {
                    console.log(res.content)
                    if (res.status) {
                        this.setState({
                            pendingTotal: res.content[0]?.book?.total_amount,
                        })

                    }
                    else {
                        alert(res)
                    }
                }).catch((err) => {
                    console.log(err)

                })
            }

        })
    }

    onChangeText = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value }, () => {
            this.onSearch(e.target.value)
        })
    }

    onSearch =async (searchStr) =>{
        
        if(!searchStr){
            this.setState({OrderListFiltered:[]})
return
        }
        let { orderList} =this.state
        console.log(orderList)
        let fiteredList = orderList.filter((item)=>{
            if( item?.book?.Name.toLowerCase().includes(searchStr.toLowerCase()) || item?.order_book?.Payment_Method.toLowerCase().includes(searchStr.toLowerCase()))
            return true 
            return false
        })
        this.setState({
            currentPage:  1
        });
        console.log(fiteredList)
        this.setState({ OrderListFiltered: fiteredList})
    }

    onClickSearch = () => {
        this.props.searchBook(this.state.search).then((res) => {
            console.log(res.content)
            if (res.status == true) {
                this.setState({
                    orderList: res.content,
                })


            }
            else {
                alert(res)
            }
        }).catch((err) => {
            console.log(err)

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
        if (list?.length < 1) {

            return <tr>
                <td class="text-center" ><b className="table-text"> No Result</b>

                </td>
            </tr>
        }

        return list.map((item, i) =>

            <tr>


                <td><img className="sellingHistoryImg" src={item?.book?.Image}></img></td>

                <td>{item?.book?.Name}</td>
                <td><Moment format="DD-MM-YY HH:MM">{item?.book?.createdAt}</Moment></td>

                <td>{item?.order_book?.Payment_Method === 'PayPal' ? item?.book?.Price_USD * 150 + ' Rs.' : item?.book?.Price + ' Rs.'}</td>
                <td>{item?.order_book?.Payment_Method === 'PayPal' ? (item?.book?.Price_USD * 150) * 0.7 + ' Rs.' : item?.book?.Price * 0.7 + ' Rs.'}</td>
                <td>{item?.order_book?.Payment_Method }</td>

                <td>
                    <div class={item?.Status === 'Cleared' ? "tableSelect_Published" : "table-badge-review"}>
                        <label className="badge-label">{!item?.Status ? 'Pending' : item?.Status}</label>
                    </div>
                </td>
                {item?.Reference_No ? 
                            <td>{item?.Reference_No }</td>

            :
            <td><img className="imgHover" src={plus} onClick={() => this.setState({ index: item, ReferenceModal: true }, () => console.log(this.state.index))} /></td>

            }

            </tr>
        )
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
    onClickBottomBar = (val) => {
        this.setState({
            activeTab: val
        })
    }
    render() {

        const { isLoading, orderList, currentPage, todosPerPage,OrderListFiltered } = this.state;
        const {  errors } = this.state;

        if (isLoading) {
            return (
                <div className="loader-large"></div>
            )
        }
        let printList = this.state.search  ? OrderListFiltered:orderList

        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentTodos = printList.slice(indexOfFirstTodo, indexOfLastTodo);

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(printList.length / todosPerPage); i++) {
            pageNumbers.push(i);
        }

        return (
            <div>
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <Modal


                        dialogClassName="col-xl-12 "
                        show={this.state.PrintModal}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >


                        <div className="  modal-body">
                            <div className="container-fluid ModalContainer">
                                <div className="col-12">
                                    <div className="row">
                                        <div className="col-10">
                                            <p className="poppins_medium ModalHading">Print Sell Report</p>
                                        </div>
                                        <div className="col-2 text-right">
                                            <img className="Hov" onClick={() => this.setState({ PrintModal: false })} src={CloseIcon} />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <div className="row">
                                        <div className="col-6">
                                            <p className="poppins_medium Modaltext">Start Date <img className="ml-3 mr-3" src={Polygon} /></p>
                                        </div>
                                        <div className="col-6 ">
                                            <p className="poppins_medium Modaltext">End Date <img className="ml-3 mr-3" src={Polygon} /></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 text-right mt-5 pt-5">
                                    <button className="PrintModalBtn">Print Report</button>
                                </div>

                            </div>

                        </div>


                    </Modal>
                    <Modal


                        dialogClassName="col-xl-12 "
                        show={this.state.ReferenceModal}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >


                        <div className="  modal-body">
                            <div className="container-fluid ModalContainer">
                                <div className="col-12">

                                    <div className="row">
                                        <div className="col-10">
                                            <p className="poppins_medium ModalHading">Reference ID:  {this.state.index?.ID}</p>
                                        </div>
                                        <div className="col-2 text-right">
                                            <img className="Hov" onClick={() => this.setState({ ReferenceModal: false })} src={CloseIcon} />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12">
                                {this.state.isUploading && <div className="loader-small"></div>}

                                    <div className="row">
                                        <div className="col-8">

                                            <div className="col-12 mt-5">
                                                <div className="row">
                                                    <div className="col-5 Vertical_center text-right">
                                                        <p className="poppins_medium Modaltext mb-0">Author Name</p>
                                                    </div>
                                                    <div className="col-7 ">
                                                        <input className="ModalInput col-12 " value={this.state.index?.book?.Author_Name} disabled={true}></input>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 mt-3">
                                                <div className="row">
                                                    <div className="col-5 Vertical_center text-right">
                                                        <p className="poppins_medium Modaltext mb-0" >Book Name</p>
                                                    </div>
                                                    <div className="col-7 ">
                                                        <input className="ModalInput col-12 " value={this.state.index?.book?.Name} disabled={true}></input>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 mt-3">
                                                <div className="row">
                                                    <div className="col-5 Vertical_center text-right">
                                                        <p className="poppins_medium Modaltext mb-0">Clearing Amount</p>
                                                    </div>
                                                    <div className="col-7 ">
                                                        <input className="ModalInput col-12 " name="Amount" onChange={this.onChangeText} value={this.state.Amount}></input>
                                                    </div>
                                                </div>
                                                {errors.Amount && <div className="invaliderrorAddNewBookImageModal">{errors.Amount}</div>}

                                            </div>
                                            <div className="col-12 mt-3">
                                                <div className="row">
                                                    <div className="col-5 Vertical_center text-right">
                                                        <p className="poppins_medium Modaltext mb-0">Payment Status</p>
                                                    </div>
                                                    <div className="col-7 ">
                                                        <select className="ModalInput col-12 " name="Status" onChange={this.onChangeText} value={this.state.Status}>
                                                            <option >Select ...</option>
                                                            <option value="Cleared" >Cleared</option>
                                                            <option value="Pending">Pending</option>
                                                            <option value="Failed">Failed</option>

                                                        </select>
                                                        
                                                        {errors.Status && <div className="invaliderrorAddNewBookImageModal">{errors.Status}</div>}

                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-12 mt-3">
                                                <div className="row">
                                                    <div className="col-5 Vertical_center text-right">
                                                        <p className="poppins_medium Modaltext mb-0">Reference Number</p>
                                                    </div>
                                                    <div className="col-7 ">
                                                        <input className="ModalInput col-12 " name="Reference_No" onChange={this.onChangeText} value={this.state.Reference_No} />

                                                        {errors.Reference_No && <div className="invaliderrorAddNewBookImageModal">{errors.Reference_No}</div>}

                                                    </div>

                                                </div>
                                            </div>


                                        </div>
                                        <div className="col-4  Vertical_center ">
                                            <div className="col-12 mt-3">
                                                <p className="poppins_medium Modaltext mb-0">Any Attachment </p>
                                                <img className="mt-3 placeholderImg" src={PlaceHolder} />

                                            </div>
                                            <div className="col-12 mt-3 text-center">
                                                <button className="mdlBtn col-12 poppins_semibold" onClick={() => this.onPayment(this.state.index)}>Save Changes</button>
                                            </div>

                                        </div>

                                    </div>


                                </div>



                            </div>

                        </div>


                    </Modal>

                    <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 managebookContainer">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 p-0">
                                <p className="poppins_semibold managebookheading">Purchase History /  {this.state.author?.Full_Name}</p>
                            </div>
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 p-0  mt-4">

                                <div className="row">
                                    <div className="col-xl-4 col-lg-4 col-md-4  ">
                                        <div className="SellingHistoryTopBarCard">
                                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">

                                                <p className="EaringRs">{this.state.totalearning * 0.3 + ' RS'}</p>
                                                <p className="totalEaring">Total Earning</p>
                                            </div>
                                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                                                <div className="row ">
                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-5 ">
                                                        <p className="viewtext">View all</p>
                                                    </div>

                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-7 " >
                                                        <select className="select_days" name="dayEarning" onChange={(e) => this.onSelectChange(e, 'Earning')}>
                                                            <option value='7'>7days</option>
                                                            <option value='14'>14days</option>
                                                            <option value='30'>30days</option>

                                                        </select>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                    <div className="col-xl-4 col-lg-4 col-md-4   ">
                                        <div className="SellingHistoryTopBarCard">
                                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">

                                                <p className="PendingRs">0 Rs</p>
                                                <p className="totalEaring">Cleared Bills</p>
                                            </div>
                                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                                                <div className="row ">
                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-5 ">
                                                        <p className="viewtext">View all</p>
                                                    </div>

                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-7 ">
                                                        <select className="select_days" name="dayPending" onChange={(e) => this.onSelectChange(e, 'Pending')}>
                                                            <option value='7'>7days</option>
                                                            <option value='14'>14days</option>
                                                            <option value='30'>30days</option>

                                                        </select>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                    <div className="col-xl-4 col-lg-4 col-md-4  ">
                                        <div className="SellingHistoryTopBarCard">
                                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">

                                                <p className="PendingRs1">0 Rs</p>
                                                <p className="totalEaring">Pending Balances </p>
                                            </div>
                                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                                                <div className="row ">
                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-5 ">
                                                        <p className="viewtext">View all</p>
                                                    </div>

                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-7 ">
                                                        <select className="select_days" name="dayPending" onChange={(e) => this.onSelectChange(e, 'Pending')}>
                                                            <option value='7'>7days</option>
                                                            <option value='14'>14days</option>
                                                            <option value='30'>30days</option>

                                                        </select>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>






                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-3 managebookContainer">

                            <div className="row">
                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12  ">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 pt-4 AllbookContainer ">
                                        <div className="row">
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 ">


                                                <p className="Allbook-heading mb-0">History</p>
                                                <p className="allbooktext mb-0">All selling History</p>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12  ">
                                                <div className="row">
                                                    <div className="col-xl-5 col-lg-5 col-md-5 col-sm-4 col-4 ">
                                                        {/* <label className="ml-3 mr-3 allbooktext">Print Now</label>
                                                        <img className="ml-3 imgHover" onClick={() => this.setState({ PrintModal: true })} src={printIcon} />
                                                     */}
                                                    </div>
                                                    <div className="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-12 text-right ">
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

                                                        {/* <th scope="col table_header poppins_medium">Book ID <img className="dropicon" src={Polygon}></img> </th> */}

                                                        <th scope="col table_header poppins_medium">Book Title
                                                            {/* <img className="dropicon" src={Polygon}></img>  */}
                                                        </th>
                                                        {this.state.sortByName ? (
                                                            <th scope="col table_header poppins_medium">Book Name
                                                                {/* <img className="dropicon" src={Polygon} onClick={() => this.onPressSortByBook('Name', 'ASC')}></img>  */}
                                                            </th>
                                                        ) : (
                                                            <th scope="col table_header poppins_medium">Book Name
                                                                {/* <img className="dropicon" src={Polygon} onClick={() => this.onPressSortByBook('Name', 'DESC')}></img> */}
                                                            </th>
                                                        )}
                                                        {this.state.sortByDate ? (
                                                            <th scope="col table_header poppins_medium">Date & Time
                                                                {/* <img className="dropicon" src={Polygon} onClick={() => this.onPressSortByOrder('createdAt', 'ASC')}></img>   */}
                                                            </th>
                                                        ) : (
                                                            <th scope="col table_header poppins_medium">Date & Time
                                                                {/* <img className="dropicon" src={Polygon} onClick={() => this.onPressSortByOrder('createdAt', 'DESC')}></img>  */}
                                                            </th>
                                                        )}
                                                        {this.state.sortByPrice ? (
                                                            <th scope="col table_header poppins_medium">Amount
                                                                {/* <img className="dropicon" src={Polygon} onClick={() => this.onPressSortByBook('Price', 'ASC')}></img>  */}
                                                            </th>
                                                        ) : (
                                                            <th scope="col table_header poppins_medium">Amount
                                                                {/* <img className="dropicon" src={Polygon} onClick={() => this.onPressSortByBook('Price', 'DESC')}></img> */}
                                                            </th>

                                                        )}
                                                        <th scope="col table_header poppins_medium">Payment Method
                                                            {/* <img className="dropicon" src={Polygon} onClick={() => this.onPressSortByBook('Price', 'DESC')}></img> */}
                                                        </th>
                                                        {this.state.sortByPrice ? (
                                                            <th scope="col table_header poppins_medium">Earning
                                                                {/* <img className="dropicon" src={Polygon} onClick={() => this.onPressSortByBook('Price', 'ASC')}></img> */}
                                                            </th>
                                                        ) : (
                                                            <th scope="col table_header poppins_medium">Earning
                                                                {/* <img className="dropicon" src={Polygon} onClick={() => this.onPressSortByBook('Price', 'DESC')}></img>  */}
                                                            </th>

                                                        )}
                                                        {this.state.sortByStatus ? (
                                                            <th scope="col table_header poppins_medium">Payment Status
                                                                {/* <img className="dropicon" src={Polygon} onClick={() => this.onPressSortByOrder('Payment_Status', 'ASC')}></img>  */}
                                                            </th>
                                                        ) : (
                                                            <th scope="col table_header poppins_medium">Payment Status
                                                                {/* <img className="dropicon" src={Polygon} onClick={() => this.onPressSortByOrder('Payment_Status', 'DESC')}></img>  */}
                                                            </th>
                                                        )}
                                                        {this.state.sortByStatus ? (
                                                            <th scope="col table_header poppins_medium">Reference No.
                                                                {/* <img className="dropicon" src={Polygon} onClick={() => this.onPressSortByOrder('Reference_No', 'ASC')}></img>  */}
                                                            </th>
                                                        ) : (
                                                            <th scope="col table_header poppins_medium">Reference No.
                                                                {/* <img className="dropicon" src={Polygon} onClick={() => this.onPressSortByOrder('Reference_No', 'DESC')}></img>   */}
                                                            </th>

                                                        )}

                                                    </tr>
                                                </thead>
                                                <tbody>




                                                    {this.state.orderList.length > 0 && this.renderTableRows(currentTodos)}

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


                </div>




            </div>

        )
    }

}

SellingHistoryAll.propTypes = {

};


const mapStateToProps = state => ({

});

const mapDispatchToProps = ({
    getAllOrders,
    sortOrderByBook,
    sortOrderByOrder,
    searchBook,
    getTotalEarning,
    getTotalPending,
    createPaymentOfOrder,
})
export default connect(mapStateToProps, mapDispatchToProps)(SellingHistoryAll);
