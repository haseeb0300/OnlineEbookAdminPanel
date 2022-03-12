
import React, { Component } from 'react';

import { connect } from 'react-redux';

import searchicon from '../../assets/images/Managebooks/searchicon.svg'
import Polygon from '../../assets/images/Managebooks/Polygon.svg'
import tableBook from '../../assets/images/Managebooks/tableBook.svg'
import visibility from '../../assets/images/Managebooks/visibility.svg'
import edit from '../../assets/images/Managebooks/edit.svg'
import epubuploadicon from '../../assets/images/epubupload.svg'

import imageplaceholder from '../../assets/images/imageplaceholder.png';




import { uploadBook, getConversionPrice,uploadImage,createBookConverReq } from '../../store/actions/bookAction';




var cx = require('classnames');





class CreateBook extends Component {
    constructor(props) {
        super(props);
        this.state = {

            errors: {},
            serverError: {},
            isLoading: false,
            book_title: "",
            author_name: "",
            book_url: "",
            cover_url: "",
            price: "",
            priceList: [],
            original_book_name: "",
            Image:"",


        };
        this.handleChange = this.handleChange.bind(this);

    }

    componentDidUpdate(prevProps, prevState, snapshot) {


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
                this.uploadBook();
            });

        }
        reader.readAsDataURL(file)
    }
    uploadBook() {
        const payload = new FormData();
        //payload.append('imageType', 'RESTAURENT_OWNER')
        payload.append('book', this.state.file);
        this.setState({ isUploading: true })
        this.props.uploadBook(payload).then((res) => {
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


    onImageChange(event) {

        event.preventDefault();

        let reader = new FileReader();
        let file = event.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                image: reader.result
            }, () => {
                this.uploadImage();
            });

        }

        reader.readAsDataURL(file)

    }
    uploadImage() {
        const payload = new FormData();
        payload.append('imageType', "BOOK")
        payload.append('photo', this.state.file);
        this.setState({ isUploading: true })
        this.props.uploadImage(payload).then((res) => {
            console.log(res.content)
            this.setState({ isUploading: false })
            if (res.content.length > 0) {
                console.log(res.content[0].url)
                    this.setState({ Image: res.content[0].url })
            }
        }).catch((err) => {
            this.setState({ isUploading: false })

        })

    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
      
    }

    componentDidMount() {

        this.props.getConversionPrice().then((res) => {
            console.log(res)
            this.setState({
                priceList: res.content,
            })

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
    onClickBottomBar = (val) => {
        this.setState({
            activeTab: val
        })
    }

    onAddBookConverReq = () => {
        // this.setState({ errors: {}, serverError: {} })
        var addBookData = {
            "Book_Url": this.state.book_url,
            "Book_Title": this.state.book_title,
            "Author_Name": this.state.author_name,
            "Book_Cover": this.state.Image,
            "Price_ID": this.state.price,    
        }
        // this.setState({ isLoading: true })
        // var msg = "Succsessfully Add item";
        // if (this.state.item_id != null) {
        //   msg = "Succsessfully Update item";
        // }
        this.props.createBookConverReq(addBookData).then((res) => {
            console.log(res)
            if (res.status) {
                console.log(res)
                // this.setState({
                //     Book_ID: res.content[0] && res.content[0].Book && res.content[0].Book.Book_ID,
                //     activeTab: this.state.activeTab + 1,
                // })
                 this.props.history.push('/trackmyrecord');
            }
        }).catch((err) => {
            var validationError = {}
            var serverError = []
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
    render() {

        const { isLoading ,errors} = this.state;


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
                                <p className="poppins_semibold managebookheading">Create a new eBook</p>
                            </div>

                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-3">
                                <div className="bookDescriptionCard">

                                    <p className="manageBookTopBarCard-Heading poppins_medium   mt-2 mb-0">Converting your Book to an eBook</p>
                                    <label className="poppins_light  manageBookTopBarCard-Text mt-2 mb-0">Please enter required information and details</label>
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-4">
                                        <div className="row">
                                            <div className=" col-xl-2 col-lg-2 col-md-3 col-sm-12 col-4 vertical_center text-right">
                                                <p className="manageBookTopBarCard-Heading poppins_medium   mb-0">Book Title</p>
                                            </div>
                                            <div className=" col-xl-4 col-lg-4 col-md-4 col-sm-12 col-8 vertical_center4">
                                                <input className="col-xl-12 managebookInput" name="book_title" onChange={this.onChange} ></input>
                                                {errors.book_title && <div className="invaliderrorLogin">{errors.book_title}</div>}

                                            </div>
                                            <div className=" col-xl-2 col-lg-2 col-md-2 col-sm-12 col-4 vertical_center text-right">
                                                <p className="manageBookTopBarCard-Heading poppins_medium   mb-0">Book Author</p>
                                            </div>
                                            <div className=" col-xl-4 col-lg-4 col-md-3 col-sm-12 col-8  vertical_center">
                                                <input className="col-xl-12 managebookInput" name="author_name" onChange={this.onChange} ></input>
                                                {errors.author_name && <div className="invaliderrorLogin">{errors.author_name}</div>}




                                            </div>

                                        </div>

                                    </div>


                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-3">
                                        <div className="row">

                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mt-3">
                                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                                                    <div className="row">
                                                        <div className="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-1 ">
                                                        </div>
                                                        <div className="col-xl-10 col-lg-10 col-md-12 col-sm-12 col-12 ">
                                                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ml-2 ">
                                                                <div className="EpubFile_roundDiv">
                                                                    <label className="poppins_bold EpubFile_roundDiv_text">1</label>
                                                                </div>

                                                            </div>

                                                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ml-4 ">
                                                                <p className="manageBookTopBarCard-Heading poppins_medium   mt-2 mb-0">Upload Book</p>
                                                                <label className="poppins_light  manageBookTopBarCard-Text mt-2 mb-0">MS Word, Adobe InDesign and InPage Urdu file.</label><br></br>

                                                                <label className=" mt-2 mb-0"><img src={epubuploadicon}></img> <label className="poppins_light  manageBookTopBarCard-Text ml-2"> {this.state.original_book_name === '' ? 'No File Uploaded' : this.state.original_book_name}  </label></label> <br></br>
                                                                <button className="col-xl-5 poppins_semibold uploadbtn" onClick={(e) => this.upload.click()}> UPLOAD FILES<input id="myInput2" type="file" onChange={(event) => this.onFileChange(event)} name="book_url" ref={(ref) => this.upload = ref} style={{ display: 'none' }} /></button>

                                                            </div>




                                                        </div>

                                                    </div>
                                                </div>
                                                {errors.book_url && <div className="invaliderrorLogin">{errors.book_url}</div>}


                                            </div>








                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mt-3">
                                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                                                    <div className="row">
                                                        <div className="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-1 ">
                                                        </div>
                                                        <div className="col-xl-10 col-lg-10 col-md-12 col-sm-12 col-12 ">
                                                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ml-2 ">
                                                                <div className="EpubFile_roundDiv">
                                                                    <label className="poppins_bold EpubFile_roundDiv_text">2</label>
                                                                </div>

                                                            </div>

                                                            {/* <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ml-4 ">
                                                                <p className="manageBookTopBarCard-Heading poppins_medium   mt-2 mb-0">Upload Book</p>
                                                                <label className="poppins_light  manageBookTopBarCard-Text mt-2 mb-0">MS Word, Adobe InDesign and InPage Urdu file.</label><br></br>

                                                                <label className=" mt-2 mb-0"><img src={epubuploadicon}></img> <label className="poppins_light  manageBookTopBarCard-Text ml-2"> {this.state.original_book_name === '' ? 'No File Uploaded' : this.state.original_book_name}  </label></label> <br></br>
                                                                <button className="col-xl-5 poppins_semibold uploadbtn"> UPLOAD FILES<input id="myInput2" type="file" onChange={(event) => this.onFileChange(event)} name="book_url" ref={(ref) => this.upload = ref} style={{ display: 'none' }} /></button>

                                                            </div> */}
                                                             <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ml-3 ">
                                                                        <p className="manageBookTopBarCard-Heading poppins_medium   mt-2 mb-0">Upload Cover</p>
                                                                        <label className="poppins_light  manageBookTopBarCard-Text mt-2 mb-0">Upload a cover you already have (JPG/TIF only)</label><br></br>
                                                                        <div className=" col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 vertical_center4">
                                                                            <div className="row">
                                                                                <div className=" col-xl-5 col-lg-5 col-md-6 col-sm-6 col-12  mt-4 vertical_center4">
                                                                                    <div className="">
                                                                                        <img src={this.state.Image === '' ? imageplaceholder : this.state.Image} style={{ width: '100%', borderRadius: '15px' }}></img>
                                                                                        {/* <p className="bookimg-placeholderText">No Cover Uploaded</p> */}
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-xl-7 col-lg-7 col-md-6 col-sm-6 col-12 mt-4">
                                                                                    {/* <button className="col-xl-12 poppins_semibold uploadbtn">UPLOAD FILE</button> */}
                                                                                    <button className="col-xl-12 poppins_semibold uploadbtn" onClick={(e) => this.uploads.click()}>UPLOAD FILE<input id="myInput" type="file" onChange={(e) => this.onImageChange(e)} name="book_url" ref={(ref) => this.uploads = ref} style={{ display: 'none' }} /></button>

                                                                                    <p className="mb-0 poppins_light  manageBookTopBarCard-Text">Not be more then 2 MB</p>
                                                                                    <p className="mb-0 poppins_light  manageBookTopBarCard-Text">Pixel Size 1645 x 2550 (Recommended)</p>
                                                                                    <p className="mb-0 poppins_light  manageBookTopBarCard-Text">Resolution 150 DPI</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>




                                                        </div>

                                                    </div>
                                                </div>
                                                {errors.book_url && <div className="invaliderrorLogin">{errors.book_url}</div>}



                                            </div>


                                        </div>
                                    </div>

                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-3">
                                        <div className="row">

                                            <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12 mt-3">

                                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                                                    <div className="row">
                                                        <div className="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-1 ">
                                                        </div>
                                                        <div className="col-xl-10 col-lg-10 col-md-12 col-sm-12 col-12 ">
                                                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ml-2 ">
                                                                <div className="EpubFile_roundDiv">
                                                                    <label className="poppins_bold EpubFile_roundDiv_text">3</label>
                                                                </div>


                                                            </div>

                                                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ml-4 ">
                                                                <p className="manageBookTopBarCard-Heading poppins_medium   mt-2 mb-0">EPUB Conversion Charges</p>
                                                                <label className="poppins_light  manageBookTopBarCard-Text mt-2 mb-0">Select as per your book pages</label><br></br>

                                                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12  ml-2 mr-2">
                                                                    {this.state.priceList.map((item, index) => (
                                                                        <p className="mt-3">
                                                                            <input type="radio" id={index}  name="price" onChange={this.onChange} value={index+1} />
                                                                            <label className="poppins_regular ml-3" for={index}>{item.Price + " PKR"}</label>
                                                                            <label className="poppins_regular ml-3" >{item.Detail}</label>

                                                                        </p>)
                                                                    )}


                                                                    {/* <p className="mt-3">
                                                                        <input type="radio" id="Easy_paisa" name="radio-group" />
                                                                        <label className="poppins_regular ml-3" for="Easy_paisa">6000 PKR</label>
                                                                        <label className="poppins_regular ml-3" >(200 - 500 Pages Book)</label>

                                                                    </p>


                                                                    <p className="mt-3">
                                                                        <input type="radio" id="Easy_paisa" name="radio-group" />
                                                                        <label className="poppins_regular ml-3" for="Easy_paisa">8000 PKR</label>
                                                                        <label className="poppins_regular ml-3" >(500 - 800 Pages Book)</label>

                                                                    </p> */}


                                                                </div>


                                                                <label className="poppins_light  manageBookTopBarCard-Text mt-2 mb-0"> <label className="poppins_medium  manageBookTopBarCard-Text  mb-0">Note:</label> If you don't find your option contact to our customer support person.</label><br></br>


                                                            </div>




                                                        </div>

                                                    </div>
                                                </div>


                                            </div>








                                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 mt_auto">

                                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12  ">
                                                    <label className="poppins_light  manageBookTopBarCard-Text mt-2 mb-0">* Note: We will need 3 to 4 working days to prepare the eBook. When your eBook is ready it will be put on your panel. From here you can download and publish your eBook.</label><br></br>
                                                    <button className="col-xl-12 continuebtn" onClick={this.onAddBookConverReq}>Continue & Pay</button>
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

CreateBook.propTypes = {

};


const mapStateToProps = state => ({

});

const mapDispatchToProps = ({
    uploadBook,
    getConversionPrice,
    uploadImage,
    createBookConverReq,
})
export default connect(mapStateToProps, mapDispatchToProps)(CreateBook);
