
import React, { Component } from 'react';

import { connect } from 'react-redux';
import progressicon from '../../assets/images/progressIcon.png'
import epubuploadicon from '../../assets/images/epubupload.svg'
import { Dropdown, Modal, DropdownButton } from 'react-bootstrap';
import crossbtn from '../../assets/images/CongratulationModal/crossBtn.svg';
import BackArrow from '../../assets/images/CongratulationModal/back-arrow.svg';
import storytelling from '../../assets/images/CongratulationModal/storytelling.svg';
import imageplaceholder from '../../assets/images/imageplaceholder.png';
import authorimagePlaceholder from '../../assets/images/authorimagePlaceholder.png';


import { uploadEpub, uploadImage, getBookCategory, createBook } from '../../store/actions/bookAction';

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup"


var cx = require('classnames');



const SignInSchema = Yup.object().shape({
    ISBN_Num: Yup.string().required("ISBN is required"),
    Age_Group: Yup.string().required("AGE Group is required"),

});

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
            activeTab: 2,
            Url: "",
            epub: "",
            original_book_name: "",
            Author_Email: "",
            Name: "",
            Sub_Title: "",
            Publisher_Name: "",
            Language: "",
            Age_Group: "",
            Author_Name: "",
            Author_Image: "",
            Author_Description: "",
            ISBN_Num: "",
            Description: "",
            Category_ID: "",
            Image: "",
            Price: "",
            Price_USD:"",
            CtaegoryList: [],
            // errors: {},
            // serverError: {},
            Book_ID: "",
            validation: {
                book_title: null,

            }

        };
        this.handleChange = this.handleChange.bind(this);

    }

    componentWillMount() {
      
            if (this.props != null && this.props.location.state != null && this.props.location.state.book) {
                console.log(this.props.location.state.book)
                // this.setState({
                //     bookList: this.props.location.state.books,
                //     pageTitle: this.props.location.state.Author_Name,

                // })
                this.setValuesOfStates(this.props.location.state.book)
            }
    }

    setValuesOfStates = (book) => {
        this.setState({
            Author_Email: book.Author_Email,
            Name: book.Name,
            Sub_Title: book.Sub_Title,
            Publisher_Name: book.Publisher_Name,
            Language: book.Language,
            Age_Group: book.Age_Group,
            Author_Name: book.Author_Name,
            Author_Image: book.Author_Image,
            Author_Description: book.Author_Description,
            ISBN_Num: book.ISBN_Num,
            Description: book.Description,
            Category_ID: book.Category_ID,
            Image: book.Image,
            Price: book.Price,
            Price_USD: book.Price_USD,
            Url: book.Url,
            Book_ID: book.Book_ID,
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {


    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
        let error = {}
        switch (e.target.name) {
            case "book_title":

                this.setState({ ...this.state.validation, [e.target.name]: " " })
                break
        }
    }
    onFileChange(event) {

        event.preventDefault();

        let readers = new FileReader();
        let file = event.target.files[0];

        readers.onloadend = () => {
            this.setState({
                file: file,
                epub: readers.result
            }, () => {
                this.uploadEpub();
            });

        }
        readers.readAsDataURL(file)
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
                this.setState({ Url: res.content[0].url, original_book_name: res.content[0].originalname })
            }
        }).catch((err) => {
            this.setState({ isUploading: false })

        })

    }

    onImageChange(event, imageType) {

        event.preventDefault();

        let reader = new FileReader();
        let file = event.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                image: reader.result
            }, () => {
                this.uploadImage(imageType);
            });

        }

        reader.readAsDataURL(file)

    }
    uploadImage(imageType) {
        const payload = new FormData();
        payload.append('imageType', imageType)
        payload.append('photo', this.state.file);
        this.setState({ isUploading: true })
        this.props.uploadImage(payload).then((res) => {
            console.log(res.content)
            this.setState({ isUploading: false })
            if (res.content.length > 0) {
                console.log(res.content[0].url)
                if (imageType === 'AUTHOR') {
                    this.setState({ Author_Image: res.content[0].url })
                } else if (imageType === 'BOOK') {
                    this.setState({ Image: res.content[0].url })
                }

            }
        }).catch((err) => {
            this.setState({ isUploading: false })

        })

    }

    componentDidMount() {
        this.props.getBookCategory().then((res) => {
            console.log(res)
            this.setState({
                CtaegoryList: res.content,
            })

        }).catch((err) => {
            console.log(err)

        })

    }

    onAddBook = () => {
        // this.setState({ errors: {}, serverError: {} })
        var addBookData = {
            "Name": this.state.Name,
            "Language": this.state.Language,
            "Age_Group": this.state.Age_Group,
            "Author_Image": this.state.Author_Image,
            "Author_Name": this.state.Author_Name,
            "Author_Description": this.state.Author_Description,
            "Description": this.state.Description,
            "Category_ID": this.state.Category_ID,
            "Sub_Title": this.state.Sub_Title,
            "Publisher_Name": this.state.Publisher_Name,
            "Author_Email": this.state.Author_Email,
            "ISBN_Num": this.state.ISBN_Num,
            "Url": this.state.Url,
            "Image": this.state.Image,
            "Price": this.state.Price,
            "Price_USD": this.state.Price_USD,
            "Book_ID": this.state.Book_ID,
        }
       
        this.props.createBook(addBookData).then((res) => {
            console.log(res)
            if (res.status) {
                console.log(res)
                if(this.state.activeTab == 3){
                    this.setState({
                        Book_ID: res.content[0] && res.content[0].Book && res.content[0].Book.Book_ID,
                        activeTab: 1,
                        CongratulationModal: !this.state.CongratulationModal,
                        Url: "",
                        epub: "",
                        original_book_name: "",
                        Author_Email: "",
                        Name: "",
                        Sub_Title: "",
                        Publisher_Name: "",
                        Language: "",
                        Age_Group: "",
                        Author_Name: "",
                        Author_Image: "",
                        Author_Description: "",
                        ISBN_Num: "",
                        Description: "",
                        Category_ID: "",
                        Image: "",
                        Price: "",
                        Price_USD:"",
                    })
                }else{
                this.setState({
                    Book_ID: res.content[0] && res.content[0].Book && res.content[0].Book.Book_ID,
                    activeTab: this.state.activeTab + 1,
                })
            }
                // this.props.history.push('/menu/menugrid');
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
    }

    onManageBook = () => {
        this.props.history.push('/managebook');
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

        const { isLoading,errors } = this.state;

        if (isLoading) {
            return (
                <div className="loader-large"></div>
            )
        }

        return (
            <div>
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <Modal


                        dialogClassName="col-sm-12"
                        show={this.state.CongratulationModal}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >


                        <div className="  modal-body">



                            <div className="container">
                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 pt-4">
                                    <div className="row">
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 ">
                                            <img className="pointerr" src={BackArrow} onClick={() => this.handlecongratulationClosemodal()}></img>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6  text-right">
                                            <img className="pointerr" src={crossbtn} onClick={() => this.handlecongratulationClosemodal()}></img>
                                        </div>

                                    </div>

                                </div>
                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 text-center pb-4 mt-3 ">
                                    <img src={storytelling}></img>
                                    <p className="poppins_medium mt-4 congratulation_text"> Congratulation  </p>
                                    <p className="poppins_light mt-4 modal_text"> Your eBook is under review in order to track your book go to Manage Books  </p>

                                    <button className="col-xl-4 poppins_semibold modalbtn " onClick = {() => this.onManageBook()}>Manage Books</button>

                                </div>




                            </div>



                        </div>


                    </Modal>

                    {/* <Formik
                        initialValues={{


                        }}
                        validationSchema={SignInSchema}
                        onSubmit={(values) => {
                            console.log(values);
                        }}

                    >
                        {({ values,
                            touched,
                            errors,

                            handleChange,

                            handleSubmit, }) => {
                            return (
                                <>
                                    <Form>


                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-4">
                                            <div className="row">
                                                <div className=" col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 vertical_center text-right">
                                                    <label className="manageBookTopBarCard-Heading poppins_medium   mb-0">ISBN Number </label>
                                                    <label className="manageBookTopBarCard-Text poppins_light   mb-0"> (Optional)</label><br></br>

                                                </div>
                                                <div className=" col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4 vertical_center4">
                                                    <input className="col-xl-12 managebookInput" name="ISBN_Num" onChange={handleChange}></input>
                                                    {errors.ISBN_Num &&
                                                        <div className="input-feedback">
                                                            {errors.ISBN_Num}
                                                        </div>}
                                                </div>
                                                <div className=" col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2  vertical_center text-right">
                                                    <p className="manageBookTopBarCard-Heading poppins_medium   mb-0">Age Group</p>
                                                    {errors.Age_Group &&
                                                        <div className="input-feedback">
                                                            {errors.Age_Group}
                                                        </div>}
                                                </div>

                                                <div className=" col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 vertical_center">
                                                    <select className="col-xl-12 managebookInput" name="Age_Group" value={values.Age_Group} onChange={handleChange}>
                                                        <option>Please Select</option>
                                                        <option value='under 18'>under 18</option>
                                                        <option value='18 - 40'>18 - 40</option>
                                                        <option value='Over 40'>Over 40</option>
                                                    </select>
                                                </div>

                                            </div>

                                        </div>
                                        <button type="submit" onClick={handleSubmit} className="btn btn-primary mr-2">Register</button>
                                    </Form>
                                </>
                            )
                        }}
                    </Formik> */}

                    <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 managebookContainer">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 p-0">
                                <p className="poppins_semibold managebookheading">Add New Book</p>
                            </div>


                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="row">
                                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 mt-3">
                                        {/* <button className={cx({ "aboutbook_btn_slider_btn": true, "aboutbook_btn_slider_btn_active": this.state.activeTab === 1 })} onClick={() => this.onClickBottomBar(1)}>About Book</button> */}

                                        <div className={cx({ "manageBookTopBarCard": true, "manageBookTopBarCard_active": this.state.activeTab === 1 })} >
                                            <label className="poppins_medium ml-3 manageBookTopBarCard-Heading mt-2 mb-0">ebook Detail</label><br></br>
                                            <label className="poppins_light ml-4 manageBookTopBarCard-Text mt-2 mb-0"><img className="ml-2 mr-2" src={progressicon}></img>{this.state.activeTab === 1? "In Progress...": "Completed"}</label>

                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 mt-3">
                                        <div className={cx({ "manageBookTopBarCard": true, "manageBookTopBarCard_active": this.state.activeTab === 2 })} >
                                            <label className="poppins_medium ml-3 manageBookTopBarCard-Heading mt-2 mb-0">ebook Content</label><br></br>
                                            <label className="poppins_light ml-4 manageBookTopBarCard-Text mt-2 mb-0"><img className="ml-2 mr-2" src={progressicon}></img>{this.state.activeTab === 2? "In Progress...":this.state.activeTab === 1? "Not Started...":"Completed..."}</label>

                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 mt-3">
                                        <div className={cx({ "manageBookTopBarCard": true, "manageBookTopBarCard_active": this.state.activeTab === 3 })} >
                                            <label className="poppins_medium ml-3 manageBookTopBarCard-Heading mt-2 mb-0">ebook Pricing</label><br></br>
                                            <label className="poppins_light ml-4 manageBookTopBarCard-Text mt-2 mb-0"><img className="ml-2 mr-2" src={progressicon}></img>{this.state.activeTab !== 3? "Not Started...": "In Progress..."}</label>
                                        </div>
                                    </div>

                                </div>

                            </div>






                            {this.state.activeTab === 1 ? (
                                <>
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-3">
                                        <div className="bookDescriptionCard">

                                            <p className="manageBookTopBarCard-Heading poppins_medium   mt-2 mb-0">Book Description</p>
                                            <label className="poppins_light  manageBookTopBarCard-Text mt-2 mb-0">Please enter book information as per requirements</label>
                                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-4">
                                                <div className="row">
                                                    <div className=" col-xl-3 col-lg-3 col-md-3 col-sm-4 col-4 mt-1 vertical_center text-right">
                                                        <p className="manageBookTopBarCard-Heading poppins_medium   mb-0">Book Title</p>
                                                    </div>
                                                    <div className=" col-xl-4 col-lg-4 col-md-4 col-sm-8 col-8 mt-1 vertical_center4">
                                                        <input className="col-xl-12 managebookInput" name="Name" onChange={this.onChange} value={this.state.Name}></input>
                                                        {errors.Name && <div className="invaliderrorAddNewBook">{errors.Name}</div>}

                                                    </div>

                                                    <div className=" col-xl-2 col-lg-2 col-md-2 col-sm-4 col-4 mt-1 vertical_center text-right">
                                                        <p className="manageBookTopBarCard-Heading poppins_medium   mb-0">Language</p>
                                                    </div>
                                                    <div className=" col-xl-3 col-lg-3 col-md-3 col-sm-8 col-8 mt-1 vertical_center">
                                                        {/* <input className="col-xl-12 managebookInput"></input> */}
                                                        <select className="col-xl-12 managebookInput" name="Language" onChange={this.onChange} value={this.state.Language}>
                                                            <option>Please Select</option>
                                                            <option value='English'>English</option>
                                                            <option value='Urdu'>Urdu</option>


                                                        </select>
                                                        {errors.Language && <div className="invaliderrorAddNewBook">{errors.Language}</div>}



                                                    </div>

                                                </div>

                                            </div>

                                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-4">
                                                <div className="row">
                                                    <div className=" col-xl-3 col-lg-3 col-md-3 col-sm-4 col-4 vertical_center text-right">
                                                        <label className="manageBookTopBarCard-Heading poppins_medium   mb-0">Subtitle </label>
                                                        <label className="manageBookTopBarCard-Text poppins_light   mb-0" > (Optional)</label><br></br>

                                                    </div>
                                                    <div className="  col-xl-4 col-lg-4 col-md-4 col-sm-8 col-8 vertical_center4">
                                                        <input className="col-xl-12 managebookInput" name="Sub_Title" onChange={this.onChange} value={this.state.Sub_Title}></input>
                                                        {errors.Sub_Title && <div className="invaliderrorAddNewBook">{errors.Sub_Title}</div>}

                                                    </div>
                                                    <div className="  col-xl-2 col-lg-2 col-md-2 col-sm-4 col-4 vertical_center text-right">
                                                        <p className="manageBookTopBarCard-Heading poppins_medium   mb-0">Category</p>
                                                    </div>
                                                    <div className=" col-xl-3 col-lg-3 col-md-3 col-sm-8 col-8 vertical_center">

                                                        <select className="col-xl-12 managebookInput" name="Category_ID" onChange={this.onChange} value={this.state.Category_ID}  >
                                                            <option value={-1} disable selected={!this.state.country}  >--Please Select--</option>

                                                            {this.state.CtaegoryList.map((item, index) =>
                                                                <option value={item.Category_ID} selected={item.Category_ID && this.state.Category_ID == item.Category_ID}>{item.Category_Name}</option>

                                                            )}
                                                        </select>
                                                        {errors.Category_ID && <div className="invaliderrorAddNewBook">{errors.Category_ID}</div>}


                                                    </div>

                                                </div>

                                            </div>

                                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-4">
                                                <div className="row">
                                                    <div className=" col-xl-3 col-lg-3 col-md-3 col-sm-4 col-4 vertical_center text-right">
                                                        <label className="manageBookTopBarCard-Heading poppins_medium   mb-0">ISBN Number </label>
                                                        <label className="manageBookTopBarCard-Text poppins_light   mb-0"> (Optional)</label><br></br>

                                                    </div>
                                                    <div className=" col-xl-4 col-lg-4 col-md-4 col-sm-8 col-8 vertical_center4">
                                                        <input className="col-xl-12 managebookInput" name="ISBN_Num" onChange={this.onChange} value={this.state.ISBN_Num}></input>
                                                        {errors.ISBN_Num && <div className="invaliderrorAddNewBook">{errors.ISBN_Num}</div>}

                                                    </div>
                                                    <div className=" col-xl-2 col-lg-2 col-md-2 col-sm-4 col-4  vertical_center text-right">
                                                        <p className="manageBookTopBarCard-Heading poppins_medium   mb-0">Age Group</p>
                                                    </div>
                                                    <div className=" col-xl-3 col-lg-3 col-md-3 col-sm-8 col-8 vertical_center">
                                                        <select className="col-xl-12 managebookInput" name="Age_Group" onChange={this.onChange} value={this.state.Age_Group}>
                                                            <option>Please Select</option>
                                                            <option value='under 18'>under 18</option>
                                                            <option value='18 - 40'>18 - 40</option>
                                                            <option value='Over 40'>Over 40</option>



                                                        </select>
                                                        {errors.Age_Group && <div className="invaliderrorAddNewBook">{errors.Age_Group}</div>}

                                                    </div>

                                                </div>

                                            </div>

                                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-4">
                                                <div className="row">
                                                    <div className=" col-xl-3 col-lg-3 col-md-3 col-sm-4 col-4 vertical_center text-right">
                                                        <label className="manageBookTopBarCard-Heading poppins_medium   mb-0">Publisher Name </label>
                                                        <label className="manageBookTopBarCard-Text poppins_light   mb-0"> (Optional)</label><br></br>

                                                    </div>
                                                    <div className=" col-xl-4 col-lg-4 col-md-4 col-sm-8 col-8 vertical_center4">
                                                        <input className="col-xl-12 managebookInput" name="Publisher_Name" onChange={this.onChange} value={this.state.Publisher_Name}></input>
                                                        {errors.Publisher_Name && <div className="invaliderrorAddNewBook">{errors.Publisher_Name}</div>}

                                                    </div>


                                                </div>

                                            </div>

                                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-4">
                                                <div className="row">
                                                    <div className=" col-xl-3 col-lg-3 col-md-3 col-sm-4 col-4  text-right">
                                                        <label className="manageBookTopBarCard-Heading poppins_medium   mb-0">About Book </label>

                                                    </div>
                                                    <div className=" col-xl-4 col-lg-4 col-md-4 col-sm-8 col-8 ">
                                                        <textarea className="col-xl-12 managebooktextarea" name="Description" onChange={this.onChange} value={this.state.Description}></textarea>
                                                        {errors.Description && <div className="invaliderrorAddNewBookDescription">{errors.Description}</div>}

                                                    </div>


                                                </div>

                                            </div>


                                        </div>

                                    </div>


                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-3">
                                        <div className="bookDescriptionCard">

                                            <p className="manageBookTopBarCard-Heading poppins_medium   mt-2 mb-0">Author Details</p>
                                            <label className="poppins_light  manageBookTopBarCard-Text mt-2 mb-0">Please enter Author information as per requirements</label>
                                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-4">
                                                <div className="row">
                                                    <div className="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-12 mt-4">
                                                        <div className="row">

                                                            <div className=" col-xl-5 col-lg-5 col-md-5 col-sm-5 col-5 vertical_center text-right">
                                                                <p className="manageBookTopBarCard-Heading poppins_medium   mb-0">Author Name</p>
                                                            </div>
                                                            <div className=" col-xl-7 col-lg-7 col-md-7 col-sm-7 col-7 vertical_center4">
                                                                <input className="col-xl-12 managebookInput" name="Author_Name" onChange={this.onChange} value={this.state.Author_Name}></input>
                                                                {errors.Author_Name && <div className="invaliderrorAddNewBook">{errors.Author_Name}</div>}

                                                            </div>

                                                            <div className=" col-xl-5 col-lg-5 col-md-5 col-sm-5 col-5 mt-4 vertical_center text-right">
                                                                <p className="manageBookTopBarCard-Heading poppins_medium   mb-0">Author Email</p>
                                                            </div>
                                                            <div className=" col-xl-7 col-lg-7 col-md-7 col-sm-7 col-7  mt-4 vertical_center4">
                                                                <input className="col-xl-12 managebookInput" name="Author_Email" onChange={this.onChange} value={this.state.Author_Email}></input>
                                                                {errors.Author_Email && <div className="invaliderrorAddNewBook">{errors.Author_Email}</div>}

                                                            </div>

                                                            <div className=" col-xl-5 col-lg-5 col-md-5 col-sm-5 col-5 mt-4 vertical_center text-right">
                                                                <p className="manageBookTopBarCard-Heading poppins_medium   mb-0">About Author</p>
                                                            </div>
                                                            <div className=" col-xl-7 col-lg-7 col-md-7 col-sm-7 col-7  mt-4 vertical_center4">
                                                                <textarea className="col-xl-12 managebooktextarea" name="Author_Description" onChange={this.onChange} value={this.state.Author_Description}></textarea>
                                                                {errors.Author_Description && <div className="invaliderrorAddNewBookDescription">{errors.Author_Description}</div>}

                                                            </div>


                                                        </div>
                                                    </div>
                                                    <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12 mt-4">
                                                        <div className="row">

                                                            <div className=" col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 vertical_center ">
                                                                <p className="manageBookTopBarCard-Heading poppins_medium   mb-0">Author Image</p>
                                                            </div>
                                                            <div className=" col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 vertical_center4">
                                                                <div className="row">
                                                                    <div className=" col-xl-4 col-lg-5 col-md-6 col-sm-6 col-12  mt-4 vertical_center4">
                                                                        <div className="">
                                                                            <img src={this.state.Author_Image === "" ? authorimagePlaceholder : this.state.Author_Image} style={{ width: '100%' }}></img>
                                                                            {/* <p className="img-placeholderText">No Upload Image</p> */}

                                                                        </div>
                                                                    </div>
                                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mt-4">
                                                                        <button className="col-xl-12 poppins_semibold uploadbtn" onClick={(e) => this.upload.click()}>UPLOAD FILE<input type="file" onChange={(e) => this.onImageChange(e, 'AUTHOR')} name="Author_Image" ref={(ref) => this.upload = ref} style={{ display: 'none' }} /></button>

                                                                        <p>Not be more than 1 MB</p>
                                                                    </div>


                                                                </div>
                                                                {errors.Author_Image && <div className="invaliderrorAddNewBookImage">{errors.Author_Image}</div>}


                                                            </div>

                                                        </div>
                                                    </div>

                                                </div>

                                            </div>


                                        </div>


                                    </div>


                                </>
                            ) : this.state.activeTab === 2 ? (
                                <>
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-3">
                                        <div className="bookDescriptionCard">

                                            <p className="manageBookTopBarCard-Heading poppins_medium   mt-2 mb-0">Ebook Files</p>
                                            <label className="poppins_light  manageBookTopBarCard-Text mt-2 mb-0">Please upload your book content</label>
                                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-3">
                                                <div className="row">

                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 P mt-3">
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
                                                                        <p className="manageBookTopBarCard-Heading poppins_medium   mt-2 mb-0">Choose File</p>
                                                                        <label className="poppins_light  manageBookTopBarCard-Text mt-2 mb-0">Preview EPUB file</label><br></br>

                                                                        <label className=" mt-2 mb-0"><img src={epubuploadicon}></img> <label className="poppins_light  manageBookTopBarCard-Text ml-2"> {this.state.original_book_name === '' ? 'No File Uploaded' : this.state.original_book_name}  </label></label> <br></br>
                                                                        <button className="col-xl-5 poppins_semibold uploadbtn" onClick={(e) => this.upload.click()} > UPLOAD FILES<input id="myInput2" type="file" onChange={(event) => this.onFileChange(event)} name="Url" ref={(ref) => this.upload = ref} style={{ display: 'none' }} /></button>

                                                                    </div>




                                                                </div>

                                                            </div>
                                                        </div>

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

                                                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ml-4 ">
                                                                        <p className="manageBookTopBarCard-Heading poppins_medium   mt-2 mb-0">Choose File</p>
                                                                        <label className="poppins_light  manageBookTopBarCard-Text mt-2 mb-0">Compelte EPUB file</label><br></br>

                                                                        <label className=" mt-2 mb-0"><img src={epubuploadicon}></img> <label className="poppins_light  manageBookTopBarCard-Text ml-2"> {this.state.original_book_name === '' ? 'No File Uploaded' : this.state.original_book_name}  </label></label> <br></br>
                                                                        <button className="col-xl-5 poppins_semibold uploadbtn" onClick={(e) => this.upload.click()} > UPLOAD FILES<input id="myInput2" type="file" onChange={(event) => this.onFileChange(event)} name="Url" ref={(ref) => this.upload = ref} style={{ display: 'none' }} /></button>

                                                                    </div>




                                                                </div>

                                                            </div>
                                                        </div>

                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                                                            <div className="row">
                                                                <div className="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-1 ">
                                                                </div>
                                                                <div className="col-xl-11 col-lg-11 col-md-12 col-sm-12 col-12 ">

                                                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                                                                        <label className="poppins_light  manageBookTopBarCard-Text mt-2 mb-0">* In case you didn't have ePub file of your book,  get our professionals services, they will create an ePub of your book, you have to provide your book manuscript in InPage or MS Word format. </label>
                                                                        <button className="col-xl-10 poppins_semibold uploadbtn">Convert your Book to eBook Now!</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mt-3">
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                                                            <div className="row">
                                                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                                                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                                                                        <div className="EpubFile_roundDiv">
                                                                            <label className="poppins_bold EpubFile_roundDiv_text">3</label>
                                                                        </div>
                                                                    </div>
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
                                                                                    <button className="col-xl-12 poppins_semibold uploadbtn" onClick={(e) => this.uploads.click()}>UPLOAD FILE<input id="myInput" type="file" onChange={(e) => this.onImageChange(e, 'BOOK')} name="Url" ref={(ref) => this.uploads = ref} style={{ display: 'none' }} /></button>

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
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>


                                </>

                            ) : this.state.activeTab === 3 && (
                                <>
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-3">
                                        <div className="bookDescriptionCard">

                                            <p className="manageBookTopBarCard-Heading poppins_medium   mt-2 mb-0">Royalty and Pricing</p>
                                            <label className="poppins_light  manageBookTopBarCard-Text mt-2 mb-0">Relationship between price and past sales and author earnings for Little Book Company.</label>
                                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-4">
                                                <div className="row">
                                                    <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12 mt-4">
                                                        <p className="manageBookTopBarCard-Text poppins_regular text-center  mb-3">Little Book Company takes 40% of per sale.</p>

                                                        <div className="row">

                                                            <div className=" col-xl-4 col-lg-5 col-md-5 col-sm-5 col-3  p-0 text-right">
                                                                <p className="manageBookTopBarCard-Heading poppins_medium  mt-1 mb-0">Book Price</p>
                                                            </div>
                                                            <div className=" col-xl-4 col-lg-4 col-md-4 col-sm-7 col-7 vertical_center">
                                                                <label className="labelinside poppins_light">Currency (PKR)</label>

                                                                <input className="col-xl-12 pricebookInput" placeholder="100.00" type="number" name="Price" onChange={this.onChange} value={this.state.Price}></input>
                                                                <label className="poppins_light  manageBookTopBarCard-Text mt-2 mb-0">*Only for Pakistan Readers</label>

                                                            </div>
                                                            <div className=" col-xl-3 col-lg-2 col-md-2 col-sm-2 col-2 p-0">
                                                                <p className="manageBookTopBarCard-Text poppins_light  mt-1 mb-0">Pak Rupees</p>

                                                            </div>





                                                        </div>
                                                    </div>
                                                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 mt-4">
                                                        <p className="manageBookTopBarCard-Text poppins_semibold text-center  mb-3">Author Royalty</p>

                                                        <div className="row">

                                                            <div className=" col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                                                                <div className="row">
                                                                    <div className=" col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6  mt-2 ">
                                                                        <p className="manageBookTopBarCard-Text poppins_regular text-center  mb-3">60%</p>

                                                                    </div>
                                                                    <div className=" col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6  mt-2 ">
                                                                        <p className="manageBookTopBarCard-Text poppins_regular text-center  mb-3">{'PKR' + this.state.Price * 0.6 + '.00'}</p>

                                                                    </div>


                                                                </div>


                                                            </div>

                                                        </div>
                                                    </div>

                                                </div>

                                            </div>
                                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-4">
                                                <div className="row">
                                                    <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12 mt-4">

                                                        <div className="row">




                                                            <div className=" col-xl-4 col-lg-5 col-md-5 col-sm-5 col-3  p-0 text-right">
                                                                <label className="manageBookTopBarCard-Heading poppins_medium   mb-0">Book Price </label>
                                                                <label className="manageBookTopBarCard-Text poppins_light ml-1   mb-0"> (Internationally)</label><br></br>
                                                            </div>
                                                            <div className=" col-xl-4 col-lg-4 col-md-4 col-sm-7 col-7 vertical_center">
                                                                <label className="labelinside poppins_light">Currency (USD)</label>
                                                                <input className="col-xl-12 pricebookInput" placeholder="10.00" name="Price_USD" onChange={this.onChange} value={this.state.Price_USD}></input>
                                                                <label className="poppins_light  manageBookTopBarCard-Text mt-2 mb-0">*Only for Pakistan Readers</label>

                                                            </div>
                                                            <div className=" col-xl-3 col-lg-2 col-md-2 col-sm-2 col-2 p-0">
                                                                <p className="manageBookTopBarCard-Text poppins_light  mt-1 mb-0">US Doller</p>

                                                            </div>



                                                        </div>
                                                    </div>
                                                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 mt-4">

                                                        <div className="row">

                                                            <div className=" col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 vertical_center4">
                                                                <div className="row">
                                                                    <div className=" col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6  mt-2 vertical_center4">
                                                                        <p className="manageBookTopBarCard-Text poppins_regular text-center  mb-3">60%</p>

                                                                    </div>
                                                                    <div className=" col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6  mt-2 vertical_center4">
                                                                        <p className="manageBookTopBarCard-Text poppins_regular text-center  mb-3">{'USD' + this.state.Price_USD * 0.6 + '.00'}</p>

                                                                    </div>


                                                                </div>


                                                            </div>

                                                        </div>
                                                    </div>

                                                </div>

                                            </div>


                                        </div>


                                    </div>

                                </>

                            )
                            }











                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-3">
                                <div className="text-right">
                                    <button className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6  poppins_semibold uploadbtn" onClick={this.onAddBook}>Save & Continue</button>

                                </div>
                            </div>




                        </div>


                    </div>


                </div>




            </div >

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
    uploadImage,
    getBookCategory,
    createBook,
})
export default connect(mapStateToProps, mapDispatchToProps)(ManageBook);
