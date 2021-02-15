
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { getConversionBooks } from '../../store/actions/bookAction';
import earingCardIcon from '../../assets/images/Dashborad/earingCardIcon.svg'
import cost from '../../assets/images/Dashborad/cost.svg'
import buy from '../../assets/images/Dashborad/buy.svg'
import openbook from '../../assets/images/Dashborad/openbook.svg'
import editbook from '../../assets/images/Dashborad/edit.svg'
import plus from '../../assets/images/Dashborad/plus.svg'
import bookCard from '../../assets/images/Dashborad/bookCard.svg'
import book1 from '../../assets/images/Dashborad/book1.svg'
import book2 from '../../assets/images/Dashborad/book2.svg'
import book3 from '../../assets/images/Dashborad/book3.svg'
import profile from '../../assets/images/Dashborad/profile.svg'
import deleteImg from '../../assets/images/Dashborad/delete.svg'
import star from '../../assets/images/Dashborad/star.svg'
import { Link, withRouter } from 'react-router-dom';
import { getTotalEarning } from '../../store/actions/orderAction';
import { getTotalOrdersAndBook, getTopSellingBooks, getLatestBook } from '../../store/actions/dashboardAction';






import { PieChart } from 'react-minimal-pie-chart';

import { Chart } from "react-google-charts";




var cx = require('classnames');



const data = [
    ["Element", "Density", { role: "style" }],
    ["Copper", 5, "#ACACAC"], // RGB value
    ["Silver", 6, "#ACACAC"], // English color name
    ["Gold", 15, "#FAC85B"],
    ["Silver", 7, "#ACACAC"], // English color name
    ["Silver", 6, "#ACACAC"], // English color name
    ["Silver", 5, "#ACACAC"], // English color name


    // ["Platinum", 21.45, "color: #e5e4e2"] // CSS-style declaration
];

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalearning: "",
            totalBooks: "",
            totalorders: "",
            bookList: [],
            newBookList: [],

        };

    }

    componentDidUpdate(prevProps, prevState, snapshot) {


    }



    componentDidMount() {

        this.props.getTotalEarning(30).then((res) => {
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

        this.props.getTotalOrdersAndBook().then((res) => {
            console.log(res.content)
            if (res.status) {
                this.setState({
                    totalorders: res.content[0]?.total_order,
                    totalBooks: res.content[0]?.book?.total_book,
                })

            }
            else {
                alert(res)
            }
        }).catch((err) => {
            console.log(err)

        })

        this.props.getTopSellingBooks().then((res) => {
            console.log(res.content)
            if (res.status) {
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

        this.props.getLatestBook().then((res) => {
            console.log(res.content)
            if (res.status) {
                this.setState({
                    newBookList: res.content,

                })

            }
            else {
                alert(res)
            }
        }).catch((err) => {
            console.log(err)

        })
    }


    viewMore = () => {
        this.props.history.push('/managebook', { book: this.state.newBookList });
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
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 AllbookContainer pt-3  pb-3">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 p-0">
                                <p className="poppins_semibold managebookheading">Welcome Author's Dashboard</p>
                            </div>
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 p-0">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="row">

                                            <div className="w_20 mt-3 ">
                                                <div className="earing_card">
                                                    <img src={earingCardIcon}></img>
                                                    <img className="costinner" src={cost}></img>
                                                    <label className="ml-2 mb-0 earningText poppins_semibold">Earning</label> <br></br>
                                                    <div className="text-right mt-2">
                                                        <label className=" mr-3  mb-0 earningAmount poppins_bold">{this.state.totalearning + '.00 RS'}</label>
                                                    </div>


                                                </div>

                                            </div>
                                            <div className="w_20  mt-3 ">
                                                <div className="totalSold_card">
                                                    <img src={earingCardIcon}></img>
                                                    <img className="costinner" src={buy}></img>
                                                    <label className="ml-2 mb-0 earningText poppins_semibold">Total Book Sold</label> <br></br>
                                                    <div className="text-right mt-2">
                                                        <label className=" mr-3  mb-0 earningAmount poppins_bold">{this.state.totalorders}</label>
                                                    </div>


                                                </div>

                                            </div>
                                            <div className="w_20  mt-3 ">
                                                <div className="totalBook_card ">
                                                    <img src={earingCardIcon}></img>
                                                    <img className="costinner" src={openbook}></img>
                                                    <label className="ml-2 mb-0 earningText poppins_semibold">Total Books</label> <br></br>
                                                    <div className="text-right mt-2">
                                                        <label className=" mr-3  mb-0 earningAmount poppins_bold">{this.state.totalBooks}</label>
                                                    </div>
                                                    <img className="editicon" src={editbook}></img>


                                                </div>

                                            </div>
                                            <div className="w_20  mt-3 ">
                                                <div className="totalSold_card">
                                                    <img src={earingCardIcon}></img>
                                                    <img className="costinner" src={buy}></img>
                                                    <label className="ml-2 mb-0 earningText poppins_semibold">Total Book Sold</label> <br></br>
                                                    <div className="text-right mt-2">
                                                        <label className=" mr-3  mb-0 earningAmount poppins_bold">{this.state.totalorders}</label>
                                                    </div>


                                                </div>

                                            </div>
                                            <div className="w_20  mt-3 ">
                                                <div className="totalBook_card ">
                                                    <img src={earingCardIcon}></img>
                                                    <img className="costinner" src={openbook}></img>
                                                    <label className="ml-2 mb-0 earningText poppins_semibold">Total Books</label> <br></br>
                                                    <div className="text-right mt-2">
                                                        <label className=" mr-3  mb-0 earningAmount poppins_bold">{this.state.totalBooks}</label>
                                                    </div>
                                                    <img className="editicon" src={editbook}></img>


                                                </div>

                                            </div>


                                        </div>
                                    </div>
                                    <div className="col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12 ">
                                        <div className="row">


                                            <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12 mt-3 ">
                                                <div className="sellinghistory_card ">
                                                    <div className="row pl-3 pr-3 ">

                                                        <div className="col-8 p-0 ">

                                                            <label className="ml-2 mb-0 selling_history_text poppins_medium">Selling History</label> <br></br>
                                                        </div>
                                                        <div className="col-4 text-right p-0  ">
                                                            <Link to="/sellinghistory">


                                                                <label className=" mr-3 mb-0 earningText pointerr poppins_medium">See All</label> <br></br>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    <Chart
                                                        chartType="ColumnChart"
                                                        width="100%"
                                                        height="215px"
                                                        data={data}
                                                    />
                                                    <div className="text-center mt-3">
                                                        <button className="btn-sellinghistory">View Details</button>
                                                    </div>


                                                </div>


                                                <div className="addnewbookcard  text-center mt-3">
                                                    <Link to="/addnewbook">

                                                        <img className="plusicon" src={plus}></img><br></br>
                                                    </Link>
                                                    <label className="poppins_regular addnewbookText">Add New Book</label>
                                                </div>



                                            </div>
                                            <div className="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-12 mt-3 ">
                                                <div className="bookcategorycard ">
                                                    <div className="row pl-3 pr-3 ">
                                                        <div className="col-8 p-0 ">
                                                            <label className="ml-2 mb-0 selling_history_text poppins_medium">Books Category Stats</label> <br></br>
                                                        </div>
                                                        <div className="col-4 text-right p-0  ">
                                                            <Link to="/managebook">

                                                                <label className=" mr-3 mb-0 earningText pointerr poppins_medium">See All</label> <br></br>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    <div className="text-center mt-5">


                                                        <PieChart
                                                            data={[
                                                                { title: 'Sindhi', value: 7, color: '#FAC85B' },
                                                                { title: 'Urdu', value: 20, color: '#B5322A' },
                                                                { title: 'English', value: 4, color: '#517A95' },

                                                            ]}
                                                        />
                                                    </div>
                                                    <div className="text-center mt-5">
                                                        <div className="col-12 ">
                                                            <div className="row">
                                                                <div className="col-1"></div>
                                                                <div className="col-10">
                                                                    <div className="row">



                                                                        <div className="col-4 p-0">

                                                                            <div className="urdusquare"></div>
                                                                            <label className="langText poppins_bold">Urdu</label>
                                                                        </div>
                                                                        <div className="col-4 p-0">

                                                                            <div className="englishsquare"></div>

                                                                            <label className="langText poppins_bold">English</label>
                                                                        </div>
                                                                        <div className="col-4 p-0">

                                                                            <div className="sindisquare"></div>

                                                                            <label className="langText poppins_bold">Sindhi</label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>


                                                    </div>


                                                </div>

                                                <div className="recentBookCard   mt-3">
                                                    <div className="row pl-3 pr-3 ">

                                                        <div className="col-8 p-0 ">

                                                            <label className="ml-2 mb-0 recentBookpublishText poppins_medium">Recent Books Published</label> <br></br>
                                                        </div>
                                                        <div className="col-4 text-right p-0  ">


                                                            <label className=" mr-3 mb-0 recentBookpublishSeeText pointerr poppins_medium" onClick={() => this.viewMore()}>See All</label> <br></br>

                                                        </div>
                                                    </div>

                                                    <div className="row pl-3 pr-3  mt-3">

                                                        <div className="col-3  ">

                                                            <label className="poppins_semibold recentbookpublishTAbs">Book Title</label> <br></br>
                                                        </div>
                                                        <div className="col-5   ">

                                                            <label className="poppins_semibold  recentbookpublishTAbs">Book Name</label> <br></br>
                                                        </div>
                                                        <div className="col-4    ">

                                                            <label className="poppins_semibold  recentbookpublishTAbs">Author Names</label> <br></br>
                                                        </div>
                                                    </div>


                                                    <div className="recentbookHr"></div>

                                                    <div className="RecentBookCardInner">
                                                        <div className="col-12">
                                                            <div className="row  ">
                                                                <div className="col-3 vertical_center ">
                                                                    <img src={this.state.newBookList[0]?.Image} style={{ width: '45px' }}></img>

                                                                </div>
                                                                <div className="col-5 vertical_center">
                                                                    <label className="poppins_bold recentBookName">{this.state.newBookList[0]?.Name}</label>
                                                                </div>
                                                                <div className="col-4 vertical_center">
                                                                    <label className="poppins_medium recentBookName">{this.state.newBookList[0]?.Author_Name}</label>

                                                                </div>
                                                            </div>


                                                        </div>
                                                    </div>
                                                </div>

                                            </div>


                                        </div>

                                    </div>
                                    <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12 col-12 ">



                                        <div className="topSelling_Card mt-3 ">
                                            <div className="row pl-3 pr-3 mt-2 ">

                                                <div className="col-8 p-0 ">

                                                    <label className="ml-2 mb-0 topSelling_CardText poppins_medium">Top Selling Book</label> <br></br>
                                                </div>
                                                <div className="col-4 text-right p-0  ">
                                                    <Link to="/managebook">

                                                        <label className=" mr-3 mb-0 earningText pointerr poppins_medium">See All</label> <br></br>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="col-12 p-0 mt-4">

                                                <div className="row  ">
                                                    {this.state.bookList.map((item, i) =>
                                                        <div className="col-4  ">
                                                            <img className="topSelling_CardImg" src={item.Image}></img>

                                                        </div>
                                                    )}
                                                    {/* <div className="col-4  ">
                                                        <img className="topSelling_CardImg" src={book2}></img>


                                                    </div>
                                                    <div className="col-4  ">
                                                        <img className="topSelling_CardImg" src={book3}></img>


                                                    </div> */}
                                                </div>
                                            </div>



                                        </div>
                                        <div className="notificationCard mt-3 ">
                                            <div className="row pl-3 pr-3 mt-2 ">

                                                <div className="col-8 p-0 ">

                                                    <label className="ml-2 mb-0 topSelling_CardText poppins_medium">Notifications</label> <br></br>
                                                </div>
                                                <div className="col-4 text-right p-0  ">
                                                    <Link to="/notification">

                                                        <label className=" mr-3 mb-0 earningText pointerr poppins_medium">See All</label> <br></br>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="col-12 p-0 mt-3">
                                                <div className="notificationInnerCard mt-3 ">
                                                    <div className="col-12 ">
                                                        <div className="row ">
                                                            <div className="col-2 vertical_center">
                                                                <img className="notiprofileimg" src={profile}></img>
                                                            </div>
                                                            <div className="col-8 pl-4 vertical_center">
                                                                <label className="mb-0 notificationNAmeText">Muhammad Saad Iqbal</label> <br></br>
                                                                <label className="mb-0 notificationRatedText">Rated the Book</label> <br></br>
                                                                <label className="mb-0 poppins_light"> <img src={star}></img> 4.2
</label>

                                                            </div>
                                                            <div className="col-2 vertical_center ">
                                                                <img className="pointerr" src={deleteImg}></img>

                                                            </div>

                                                        </div>

                                                    </div>

                                                </div>

                                                <div className="notificationInnerCard mt-3 ">
                                                    <div className="col-12 ">
                                                        <div className="row ">
                                                            <div className="col-2 vertical_center">
                                                                <img className="notiprofileimg" src={profile}></img>
                                                            </div>
                                                            <div className="col-8 pl-4 vertical_center">
                                                                <label className="mb-0 notificationNAmeText">Muhammad Saad Iqbal</label> <br></br>
                                                                <label className="mb-0 notificationRatedText">Rated the Book</label> <br></br>
                                                                <label className="mb-0 poppins_light"> <img src={star}></img> 4.2</label>

                                                            </div>
                                                            <div className="col-2 vertical_center ">
                                                                <img className="pointerr" src={deleteImg}></img>

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

Dashboard.propTypes = {

};


const mapStateToProps = state => ({
    auth: state.auth


});

const mapDispatchToProps = ({
    getConversionBooks,
    getTotalEarning,
    getTotalOrdersAndBook,
    getTopSellingBooks,
    getLatestBook,

})
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
