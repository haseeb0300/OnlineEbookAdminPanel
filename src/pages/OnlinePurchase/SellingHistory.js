
import React, { Component } from 'react';

import { connect } from 'react-redux';

import searchicon from '../../assets/images/Managebooks/searchicon.svg'
import Polygon from '../../assets/images/Managebooks/Polygon.svg'
import tableBook from '../../assets/images/Managebooks/tableBook.svg'
import visibility from '../../assets/images/Managebooks/visibility.svg'
import moment from 'moment'
import Moment from 'react-moment';

import { getAllOrder, sortOrderByBook, sortOrderByOrder, searchBook, getTotalEarning,getTotalPending } from '../../store/actions/orderAction';




var cx = require('classnames');





class SellingHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderList: [],
            errors: {},
            serverError: {},
            isLoading: false,
            sortByName: false,
            sortByDate: false,
            sortByStatus: false,
            sortByReference: false,
            sortByPrice:false,
            search:'',
            totalearning:'',
            pendingTotal:'',
            dayEarning:'',
            dayPending:'',

        };
        this.handleChange = this.handleChange.bind(this);

    }

    componentDidUpdate(prevProps, prevState, snapshot) {


    }




    componentDidMount() {
        this.props.getAllOrder().then((res) => {
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

        this.props.getTotalEarning(7).then((res) => {
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

    onSelectChange = (e,type) => {
        this.setState({ [e.target.name]: e.target.value },() => {
        if(type == 'Earning'){
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
        }else if (type == 'Pending'){
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


    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value },()=>{
            this.onClickSearch()
        })
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

    renderTableRows = () => {
        if (this.state.orderList?.length < 1) {

            return <tr>
                <td class="text-center" ><b className="table-text"> No Result</b>

                </td>
            </tr>
        }

        return this.state.orderList.map((item, i) =>

            <tr>



                {/* <td>{item.Book_ID}</td> */}

                <td><img src={item.book?.Image} width="50px"></img></td>

                <td>{item.book?.Name}</td>
                <td><Moment format="DD-MM-YY HH:MM">{item.created_at}</Moment></td>
                <td>{item.book?.Price}</td>

                <td>
                    <div class={item.Payment_Status == 'Cleared' ? "table-badge-publish" : item.Payment_Status == 'Pending' ? "table-badge-review" : "table-badge-blocked"}>
                        <label className="badge-label" checked>
                            {item.Payment_Status}                                        </label>
                    </div>
                </td>
                <td>
                    {item.Reference_No}
                </td>




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
                                <p className="poppins_semibold managebookheading">Selling History</p>
                            </div>
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 p-0  mt-4">

                                <div className="row">
                                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6  ">
                                        <div className="SellingHistoryTopBarCard">
                                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">

                                                <p className="EaringRs">{this.state.totalearning + '.00 RS'}</p>
                                                <p className="totalEaring">Total Earning</p>
                                            </div>
                                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                                                <div className="row ">
                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-5 ">
                                                        <p className="viewtext">View all</p>
                                                    </div>

                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-7 " >
                                                        <select className="select_days" name="dayEarning" onChange={(e) => this.onSelectChange(e,'Earning')}>
                                                            <option value='7'>7days</option>
                                                            <option value='14'>14days</option>
                                                            <option value='30'>30days</option>

                                                        </select>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6   ">
                                        <div className="SellingHistoryTopBarCard">
                                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">

                                                <p className="PendingRs">{this.state.pendingTotal + '.00 RS'}</p>
                                                <p className="totalEaring">Pending Amounts</p>
                                            </div>
                                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                                                <div className="row ">
                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-5 ">
                                                        <p className="viewtext">View all</p>
                                                    </div>

                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-7 ">
                                                    <select className="select_days" name="dayPending" onChange={(e) => this.onSelectChange(e,'Pending')}>
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
                                                    <div className="col-xl-5 col-lg-5 col-md-5 col-sm-4 col-4 "></div>
                                                    <div className="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-12 text-right ">
                                                        <img className="searchicon" src={searchicon}></img>

                                                        <input className="search_input " placeholder="search here" name = "search" onChange={this.onChange}></input>
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

                                                        {/* <th scope="col table_header poppins_medium">Book ID <img className="dropicon" src={Polygon}></img> </th> */}

                                                        <th scope="col table_header poppins_medium">Book Title <img className="dropicon" src={Polygon}></img>  </th>
                                                        {this.state.sortByName ? (
                                                            <th scope="col table_header poppins_medium">Book Name  <img className="dropicon" src={Polygon} onClick={() => this.onPressSortByBook('Name', 'ASC')}></img> </th>
                                                        ) : (
                                                                <th scope="col table_header poppins_medium">Book Name  <img className="dropicon" src={Polygon} onClick={() => this.onPressSortByBook('Name', 'DESC')}></img> </th>
                                                            )}
                                                        {this.state.sortByDate ? (
                                                            <th scope="col table_header poppins_medium">Date & Time <img className="dropicon" src={Polygon} onClick={() => this.onPressSortByOrder('createdAt', 'ASC')}></img>  </th>
                                                        ) : (
                                                                <th scope="col table_header poppins_medium">Date & Time <img className="dropicon" src={Polygon} onClick={() => this.onPressSortByOrder('createdAt', 'DESC')}></img>  </th>
                                                            )}
                                                        {this.state.sortByPrice ? (
                                                            <th scope="col table_header poppins_medium">Amount  <img className="dropicon" src={Polygon} onClick={() => this.onPressSortByBook('Price', 'ASC')}></img> </th>
                                                        ) : (
                                                                <th scope="col table_header poppins_medium">Amount  <img className="dropicon" src={Polygon} onClick={() => this.onPressSortByBook('Price', 'DESC')}></img> </th>

                                                            )}
                                                        {this.state.sortByStatus ? (
                                                            <th scope="col table_header poppins_medium">Payment Status <img className="dropicon" src={Polygon} onClick={() => this.onPressSortByOrder('Payment_Status', 'ASC')}></img>  </th>
                                                        ) : (
                                                                <th scope="col table_header poppins_medium">Payment Status <img className="dropicon" src={Polygon} onClick={() => this.onPressSortByOrder('Payment_Status', 'DESC')}></img>  </th>
                                                            )}
                                                        {this.state.sortByStatus ? (
                                                            <th scope="col table_header poppins_medium">Reference No. <img className="dropicon" src={Polygon} onClick={() => this.onPressSortByOrder('Reference_No', 'ASC')}></img>  </th>
                                                        ) : (
                                                                <th scope="col table_header poppins_medium">Reference No. <img className="dropicon" src={Polygon} onClick={() => this.onPressSortByOrder('Reference_No', 'DESC')}></img>  </th>

                                                            )}

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {/* <tr>

                                                        <td>03241</td>

                                                        <td><img src={tableBook}></img></td>

                                                        <td>Mashk-e-Sukhan</td>
                                                        <td>29-12-2020, 16:34</td>

                                                        <td>170 RS.</td>

                                                        <td>
                                                            <div class="table-badge-review">
                                                                <label className="badge-label">Pending</label>
                                                            </div>
                                                        </td>
                                                        <td></td>


                                                    </tr>

                                                    <tr>


                                                        <td>03241</td>

                                                        <td><img src={tableBook}></img></td>

                                                        <td>Mashk-e-Sukhan</td>
                                                        <td>29-12-2020, 16:34</td>
                                                        <td>170 RS.</td>

                                                        <td>
                                                            <div class="table-badge-publish">
                                                                <label className="badge-label" checked>
                                                                    Cleared                                        </label>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            251466196812
                                                        </td>



                                                    </tr>
                                                    <tr>
                                                      
                                                        <td>03241</td>

                                                        <td><img src={tableBook}></img></td>

                                                        <td>Mashk-e-Sukhan</td>
                                                        <td>29-12-2020, 16:34</td>

                                                        <td>170 RS.</td>
                                                        <td>
                                                            <div class="table-badge-review">
                                                                <label className="badge-label">
                                                                    Pending
</label>
                                                            </div>
                                                        </td>
                                                        <td></td>



                                                    </tr>
                                                    <tr>
                                                       
                                                        <td>03241</td>

                                                        <td><img src={tableBook}></img></td>

                                                        <td>Mashk-e-Sukhan</td>
                                                        <td>29-12-2020, 16:34</td>
                                                        <td>170 RS.</td>
                                                        <td>
                                                            <div class="table-badge-blocked">
                                                                <label className="badge-label">
                                                                    Failed
</label>
                                                            </div>
                                                        </td>
                                                        <td></td>


                                                    </tr> */}


                                                    {this.state.orderList.length > 0 && this.renderTableRows()}

                                                </tbody>

                                            </table>

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

SellingHistory.propTypes = {

};


const mapStateToProps = state => ({

});

const mapDispatchToProps = ({
    getAllOrder,
    sortOrderByBook,
    sortOrderByOrder,
    searchBook,
    getTotalEarning,
    getTotalPending,
})
export default connect(mapStateToProps, mapDispatchToProps)(SellingHistory);
