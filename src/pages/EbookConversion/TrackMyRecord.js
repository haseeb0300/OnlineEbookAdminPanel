
import React, { Component } from 'react';

import { connect } from 'react-redux';
import edit from '../../assets/images/Managebooks/edit.svg'
import { getConversionBooks,downloadFile } from '../../store/actions/bookAction';
import Polygon from '../../assets/images/Managebooks/Polygon.svg'
import tableBook from '../../assets/images/Managebooks/tableBook.svg'
import moment from 'moment'
import Moment from 'react-moment';
// import download from "downloadjs";
import axios from 'axios';



var cx = require('classnames');





class TrackMyRecord extends Component {
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
            bookList:{},

        };

    }

    componentDidUpdate(prevProps, prevState, snapshot) {


    }



    componentDidMount() {
        this.props.getConversionBooks().then((res) => {
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

    downloadFile = (Book_Url) => {
        // this.props.downloadFile(Book_Url).then((res) => {
            
        //     console.log(res)
        //     return
        //     // if (res.status == true) {
        //     // //    this.setState({
        //     // //       bookList: res.content,
        //     // //    })
        //     // return
   
        //     // }
        //     // else {
        //     //    alert(res)
        //     // }
        //  }).catch((err) => {
        //     console.log(err)
   
        //  })
        
        axios({
            url: 'http://localhost:4002/v1/api/download?Book_Name='+Book_Url,
            method: 'GET',
            responseType: 'blob', // important
          }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'file.docx');
            document.body.appendChild(link);
            link.click();
          });
    }

    renderTableRows = () => {
        var myData = [];
        if (this.state.bookList && this.state.bookList.length < 1) {
            console.log("here")
            return <tr>
                <td ><b className="table-text"> No Result</b>

                </td>
            </tr>
        }
      
            return this.state.bookList.map((item, i) =>
            <tr>

            <td>{item.Book_Title}</td>

            <td>{item.Author_Name}</td>

            <td><img src={item.Book_Cover} width="50px"></img></td>
            <td>{item.conversion_price && item.conversion_price.Price + ' PKR'} </td>

            <td><Moment format="DD-MM-YY HH:MM">{item.created_at}</Moment></td>

            <td>
                07-12-2020, 11:30 PM
                    </td>
            <td className="downloadtext" onClick = {() => this.downloadFile(item.Book_Url)}>Download Now</td>


        </tr>
           
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

                    <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 managebookContainer">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 p-0">
                                <p className="poppins_semibold managebookheading">Track my eBook</p>
                            </div>

                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 pt-3 AllbookContainer ">
                                <div className="table-responsive mt-4 checkout_container tableheight">
                                    <table className="table table-hover thead-primary ">
                                        <thead>
                                            <tr>


                                                <th scope="col table_header poppins_medium">Book Title <img className="dropicon" src={Polygon}></img>  </th>
                                                <th scope="col table_header poppins_medium">Author Name  <img className="dropicon" src={Polygon}></img> </th>
                                                <th scope="col table_header poppins_medium">Uploaded Book  <img className="dropicon" src={Polygon}></img> </th>

                                                <th scope="col table_header poppins_medium">Charges <img className="dropicon" src={Polygon}></img>  </th>
                                                <th scope="col table_header poppins_medium">Summited Date  <img className="dropicon" src={Polygon}></img> </th>
                                                <th scope="col table_header poppins_medium">Delivered Date <img className="dropicon" src={Polygon}></img>  </th>
                                                <th scope="col table_header poppins_medium">eBook <img className="dropicon" src={Polygon}></img>  </th>


                                            </tr>
                                        </thead>
                                        <tbody>
                                           

                                        {this.state.bookList.length > 0 && this.renderTableRows()}



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

TrackMyRecord.propTypes = {

};


const mapStateToProps = state => ({

});

const mapDispatchToProps = ({
    getConversionBooks,
    downloadFile,
})
export default connect(mapStateToProps, mapDispatchToProps)(TrackMyRecord);
