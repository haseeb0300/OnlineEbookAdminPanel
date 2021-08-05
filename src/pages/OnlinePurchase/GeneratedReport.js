
import React, { Component } from 'react';

import { connect } from 'react-redux';
import Logo from '../../assets/images/Logo.svg'

import Moment from 'react-moment';


class GeneratedReport extends Component {
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
            reportContent: [],
            data: {},
            totalEarning:0,

        };

    }

    componentDidUpdate(prevProps, prevState, snapshot) {


    }


    componentWillMount() {
        if (this.props?.location?.state?.content) {


            console.log(this.props.location.state.content)
            this.setState({
                reportContent: this.props.location.state.content

            })
        }

        if (this.props?.location?.state?.data) {


            console.log(this.props.location.state.data)
            this.setState({
                data: this.props.location.state.data

            })
        }

    }
    componentDidMount() {
        console.log(this.props.user)
    this.getTotal()
    }



    printReceipt() {
        window.print();
    }

    getTotal = () => {
        var totalEarning = 0
        for(var i =0; i < this.state.reportContent?.length; i ++){
            if(this.state.reportContent[i]?.Payment_Method === "PayPal"){
                totalEarning = totalEarning + parseInt(this.state.reportContent[i]?.order_has_books[0]?.book?.Price_USD * 150)
            }
            else{
            totalEarning = totalEarning + parseInt(this.state.reportContent[i]?.order_has_books[0]?.book?.Price)
        }
        console.log(totalEarning)
        }
        this.setState({totalEarning:totalEarning})
    }

    renderTableRows = () => {
        var myData = [];
        
        return this.state.reportContent.map((item, i) =>
        <>

            <tr>
                <td>{item?.Order_ID}</td>
                <td><Moment format="DD-MM-YY">{item.createdAt}</Moment></td>
                <td>{item?.order_has_books[0]?.book?.Name}</td>
                <td>{item?.Payment_Method == "PayPal"? item?.order_has_books[0]?.book?.Price_USD * 150:item?.order_has_books[0]?.book?.Price}</td>
                <td>{item?.Payment_Method}</td>

                <td>{item?.Payment_Method == "PayPal"? (item?.order_has_books[0]?.book?.Price_USD * 150) * 0.7:item?.order_has_books[0]?.book?.Price * 0.7}</td>

            </tr>
</>
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
            <div className="GeneratedReportContainer">
                <div className="text-right mt-4 mb-4">
                    <button className="hide-on-print" onClick={this.printReceipt}>Print</button>
                </div>
                <div className="col-12 ">
                    <div className="row">
                        <div className="col-2">
                            <img className="W_90" src={Logo} />
                            <div className="HorizontalLine"></div>

                        </div>

                        <div className="col-8">
                            <p className="poppins_regular mb-0 SaleReportHEading">Sales Report</p>
                            <p className="poppins_medium  mb-0 SaleReportHEading1">{this.state.reportContent[0]?.order_has_books[0]?.book?.publisher?.user?.Full_Name}</p>
                            <p className="poppins_regular mb-0 SaleReportHEading">From <Moment format="D MMMM YYYY">{this.state.data?.startDate}</Moment> till <Moment format="D MMMM YYYY">{this.state.data?.endDate}</Moment></p>

                        </div>
                        {/* <div className="col-2">
                            <p className="poppins_regular mb-0 SaleReportHEading">0 3 /01 /2021</p>

                        </div> */}


                    </div>





                </div>
                <div className="col-12 GenratedReportTable mt-5">
                    <table className="table table-hover thead-primary ">
                        <thead>
                            <tr>

                                <th scope="col table_header poppins_medium">Order_ID  </th>
                                <th scope="col table_header poppins_medium">Date </th>
                                <th scope="col table_header poppins_medium">Book Name </th>
                                <th scope="col table_header poppins_medium">Book Price </th>

                                <th scope="col table_header poppins_medium">Payment Method </th>

                                <th scope="col table_header poppins_medium">
                                    <p className="mb-0">Total Sale</p>
                                    <p className="mb-0 ExcludingText">Excluding TLBC 30 %</p>
                                </th>


                            </tr>
                        </thead>

                        <tbody>

                            {/* <tr>

                                <td>12 Jan 2021</td>
                                <td>Dunyazad vol 49</td>
                                <td>70</td>
                                <td>100</td>
                                <td>7000</td>
                                <td>4900</td>

                            </tr>
                            <tr>

                                <td>12 Jan 2021</td>
                                <td>Dunyazad vol 49</td>
                                <td>70</td>
                                <td>100</td>
                                <td>7000</td>
                                <td>4900</td>

                            </tr>

                            <tr>

                                <td>12 Jan 2021</td>
                                <td>Dunyazad vol 49</td>
                                <td>70</td>
                                <td>100</td>
                                <td>7000</td>
                                <td>4900</td>

                            </tr>

                            <tr>

                                <td>12 Jan 2021</td>
                                <td>Dunyazad vol 49</td>
                                <td>70</td>
                                <td>100</td>
                                <td>7000</td>
                                <td>4900</td>

                            </tr> */}
                            {this.state.reportContent && this.renderTableRows()}







                        </tbody>

                        <tfoot className="mt-5 Foot">
                            <tr className="borderTp ">


                                <th scope="col table_header poppins_medium text-left" colspan="3"><p className="GenratedReportTotalEaring">Total Earning </p></th>


                                <th scope="col table_header poppins_medium" >{this.state.totalEarning} </th>
                                <th></th>
                                {/* <th scope="col table_header poppins_medium"> 20,400 </th> */}
                                <th scope="col table_header poppins_medium">
                                    <p className="mb-0 ">{this.state.totalEarning * 0.7}</p>
                                </th>


                            </tr>
                        </tfoot>

                    </table>

                </div>

                {/* <div className="col-12 GenratedReportTable2 mt-5">
                    <p className="PaymentTransfer">Payment Transfer</p>
                    <table className="table table-hover thead-primary ">
                        <thead>
                            <tr>


                                <th scope="col table_header poppins_medium"><p className="mb-0">Date</p> <p className="mb-0">20 Jan 2021</p> </th>
                                <th scope="col table_header poppins_medium"><p className="mb-0">Reference No. </p> <p className="mb-0">125967</p> </th>
                                <th scope="col table_header poppins_medium"><p className="mb-0">Bank Name</p> <p className="mb-0">UBL</p> </th>

                                <th scope="col table_header poppins_medium"><p className="mb-0">Account Title</p> <p className="mb-0">Ghazal Asif Farrukhi</p> </th>
                                <th scope="col table_header poppins_medium"><p className="mb-0">Amount</p> <p className="mb-0">14,280</p> </th>




                            </tr>
                        </thead>

                        <tbody>

                            <tr>
                                <td scope="col table_header poppins_medium text-left" colspan="4"><p className="GenratedReportTotalEaring">Total </p></td>

                                <td>14,280</td>


                            </tr>
                            <tr>
                                <td scope="col table_header poppins_medium text-left" colspan="4"><p className="GenratedReportTotalEaring">Balance </p></td>

                                <td>00.00 </td>


                            </tr>







                        </tbody>


                    </table>

                </div> */}



                <div className="mt-5 col-12 text-center">
                    <p className="PageNAv">Page 1 /1</p>
                    <div className="HR"></div>
                    <p className="PageNAv">w w w. l i t t l e b o o kc o m pa n y. n e t</p>

                </div>
            </div>

        )
    }

}

GeneratedReport.propTypes = {

};


const mapStateToProps = state => ({
    auth: state.auth,
    user: state.auth.user
});

const mapDispatchToProps = ({

})
export default connect(mapStateToProps, mapDispatchToProps)(GeneratedReport);
