
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { uploadEpub } from '../../store/actions/bookAction';
import Polygon from '../../assets/images/Managebooks/Polygon.svg'

import { generateReport } from '../../store/actions/orderAction';

import { getAllPublisher } from '../../store/actions/authActions';


//import { GoogleLogin } from 'react-google-login';





class Reports extends Component {
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
            startDate: "",
            endDate: "",
            reportType: "",
            publisherList: [],
            User_ID: "",

        };

    }

    componentDidUpdate(prevProps, prevState, snapshot) {


    }

    responseGoogle = (response) => {
        console.log(response);
    }

    componentDidMount() {
        this.props.getAllPublisher().then((res) => {
            //console.log("Pubisher :", res.content)
            if (res.status == true) {
                this.setState({
                    publisherList: res.content,
                })

            }
            else {
                alert(res)
            }
        }).catch((err) => {
            //console.log(err)

        })

    }

    onGenerateReport = () => {
        const data = {
            "startDate": this.state.startDate,
            "endDate": this.state.endDate,
            "User_ID": this.state.User_ID,
        }
        this.props.generateReport(data).then((res) => {
            //console.log(res.content)

            this.props.history.push("/generatedreport", { content: res.content, data: data })

        }).catch((err) => {
            //console.log(err)

        })

    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })

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
                    {/* <GoogleLogin
                        clientId="666154691597-ppekndgre077i7drr7oh3mnhqghguoho.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    /> */}
                    <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 managebookContainer">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 p-0">
                                <p className="poppins_semibold managebookheading">Reports</p>
                            </div>

                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 pt-3 AllbookContainer ">
                                <div className="table-responsive mt-4 checkout_container ">
                                    <table className="table table-hover thead-primary ">
                                        <thead>
                                            <tr>


                                                <th scope="col table_header poppins_medium">Select Author/Publisher
                                                </th>
                                                <th scope="col table_header poppins_medium">Start Date
                                                </th>
                                                <th scope="col table_header poppins_medium">End Date
                                                </th>


                                                <th scope="col table_header generateReportth poppins_medium"><button className="generateReportBtn" onClick={this.onGenerateReport}>Generate Report</button> </th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>

                                                <td>
                                                    <select className="managebookInput" name="User_ID" onChange={this.onChange} value={this.state.User_ID}>
                                                        <option value={-1} disable selected={!this.state.User_ID}  >--Please Select--</option>

                                                        {this.state.publisherList.map((item, index) =>
                                                            <option value={item.User_ID} selected={item.User_ID && this.state.User_ID == item.User_ID}>{item.Full_Name}</option>

                                                        )}
                                                    </select>

                                                </td>
                                                <td><input type="date" name="startDate" onChange={this.onChange} /> </td>
                                                <td><input type="date" name="endDate" onChange={this.onChange} /> </td>


                                            </tr>
                                        </tbody>


                                    </table>

                                </div>



                            </div>





                        </div>


                    </div>


                </div>




            </div>

        )
    }

}

Reports.propTypes = {

};


const mapStateToProps = state => ({

});

const mapDispatchToProps = ({
    uploadEpub,
    generateReport,
    getAllPublisher
})
export default connect(mapStateToProps, mapDispatchToProps)(Reports);
